const docsQuery = `
	{
		allMdx {
			nodes {
				objectId: id
				fields {
					slug
				}
				frontmatter {
					title
				}
				internal {
					content
				}
			}
		}
	}
`

const queries = [
	{
		query: docsQuery,
		transformer: ({ data }) => {
			return data.allMdx.nodes.reduce((indices, rules) => {
				const pChunks = rules.internal.content.split('\n')

				let chunks = []
				let title = ''
				let section = ''
				let headline = ''
				let subheadline = ''

				pChunks.forEach(string => {
					if (string.indexOf('title:') == 0) {
						title = string
						section = ''
						headline = ''
						subheadline = ''
					}
					else if (string.indexOf('###') == 0) {
						subheadline = string
					} else if (string.indexOf('##') == 0) {
						headline = string
						subheadline = ''
					} else if (string.indexOf('#') == 0) {
						section = string
						headline = ''
						subheadline = ''
					} else if (string.length > 0 && string !== '---') {
						chunks.push(
							{
								title: title.replace('title: ', ''),
								section: section.replace('# ', ''),
								headline: headline.replace('## ', ''),
								string: string
							}
						)
					}
				})

				const chunkMap = chunks.map((chnk, index) => ({
					id: rules.objectId + '/' + index,
					slug: rules.fields.slug + '#' + chnk.headline.replace(/\s+/g, '-').toLowerCase(),
					section: chnk.section,
					headline: chnk.headline,
					title: chnk.title,
					excerpt: chnk.string,
				}))

				const filtered = chunkMap.filter(chnk => !!chnk.excerpt)

				return [...indices, ...filtered]
			}, [])
		},
	},
]

module.exports = queries
