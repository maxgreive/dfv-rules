const queries = require("./src/@rocketseat/gatsby-theme-docs/util/algolia")

require("dotenv").config()

module.exports = {
  siteMetadata: {
    siteTitle: `DFV Regeln`,
    defaultTitle: `DFV Regeln`,
    siteTitleShort: `DFV Regeln`,
    siteDescription: `Alle Regeln der Scheibensportarten Disc Golf, Ultimate und Freestyle.`,
    siteUrl: `https://dfv-rules.netlify.com`,
    siteAuthor: `@maxgreive`,
    siteImage: `/banner.png`,
    siteLanguage: `en`,
    themeColor: `#7159c1`,
    basePath: `/`,
    footer: `Built by Greive.tech`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        githubUrl: `https://github.com/maxgreive/dfv-rules`,
        baseDir: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rocketseat Gatsby Themes`,
        short_name: `RS Gatsby Themes`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: ``,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://rocketdocs.netlify.com`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 1000, // default: 1000
      },
    },
  ],
};
