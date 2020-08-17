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
		settings: {
			attributeForDistinct: 'headline',
			distinct: true,
		},
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
					} else if (string.indexOf('###') == 0) {
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
								subheadline: subheadline.replace('###', ''),
								string: string
							}
						)
					}
				})

				const chunkMap = chunks.map((chnk, index) => ({
					id: rules.objectId + '/' + index,
					slug: rules.fields.slug + '#' + slug(chnk.subheadline || chnk.headline),
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

function slug(string) {
	return string
		.toString() // Cast to string
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s/g, '-') // Replace each space with -
		.replace(
			/[^\w\-\u00b4\u00C0-\u00C4\u00c7\u00C9-\u00CA\u00CD\u00D3-\u00D6\u00DA\u00DC\u00E0-\u00E4\u00E7\u00E9-\u00EA\u00ED\u00F3-\u00F6\u00FA\u00FC]+/g,
			'',
		); // Removes all chars that aren't words, -, ´ or some latin characters (À Á Â Ã Ç É Ê Í Ó Ô Õ Ú à á â ã ç é ê í ó ô õ ú)
}


module.exports = queries
