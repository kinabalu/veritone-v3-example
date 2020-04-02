/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Veritone v3`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // I have created a dummy site for us to use with the plugins we discussed
        baseUrl: 'veritone-wp-v3.mystic.engineering',
        protocol: 'http',
        hostingWPCOM: false,
        // We will be using some advanced custom fields
        useACF: true,
        acfOptionPageIds: [],
        verboseOutput: true,
        perPage: 100,
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 1,
        excludedRoutes: [],
        normalizer: function ({ entities }) {
          return entities
        },
        keepMediaSizes: false,
        searchAndReplaceContentUrls: {
          sourceUrl: 'http://veritone-wp-v3.mystic.engineering',
          replacementUrl: 'https://localhost:8000'
        },
        includedRoutes: [
          '**/categories',
          '**/posts',
          '**/pages',
          '**/media',
          '**/tags',
          '**/taxonomies',
          '**/users',
          '**/menus',
          '**/project'
        ]
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Veritone Test Site`,
        short_name: `Veritone Test Site`,
        start_url: `/`,
        background_color: `#0F0F0F`,
        theme_color: `#0F0F0F`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/img/icons/emergence-touch.png`, // This path is relative to the root of the site.
        cache_busting_mode: 'none'
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/*']
        }
      }
    },
    `gatsby-plugin-netlify`
  ]
}
