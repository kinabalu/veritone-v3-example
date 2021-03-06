const path = require('path')
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const portfolio = await graphql(`
    query {
        allWordpressWpProject {
          edges {
            node {
              wordpress_id
              slug
            }
          }
        }
      }
    `)

    const portfolioTemplate = path.resolve('./src/templates/case-study.js')
    portfolio.data.allWordpressWpProject.edges.forEach(edge => {
        createPage({
            // url of page
            path: `case-study/${edge.node.slug}`,
            // specificy template
            component: slash(portfolioTemplate),
            // expose id to template's graphQL query
            context: {
              id: edge.node.wordpress_id
            }
        })
    })

  const defaultPages = await graphql(`
    query {
      allWordpressPage {
        edges {
          node {
            wordpress_id
            title
            slug
            template
          }
        }
      }
    }
    `)

    const pageTemplate = path.resolve('./src/templates/default.js')
    defaultPages.data.allWordpressPage.edges.forEach(edge => {
        createPage({
            // url of page
            path: `${edge.node.slug}`,
            // specificy template
            component: slash(pageTemplate),
            // expose id to template's graphQL query
            context: {
              id: edge.node.wordpress_id
            }
        })
    })
}


const {fmImagesToRelative} = require('gatsby-remark-relative-images')

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions
  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// // using Gatsby Type Builder API
// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions

//   const imageConsts = {
//     width: {
//       type: 'String!',
//       resolve(parent) {
//         if (parent.width === false)
//           return ''
//         return parent.width.toString()
//       }
//     },
//     height: {
//       type: 'String!',
//       resolve(parent) {
//         if (parent.width === false)
//           return ''
//         return parent.height.toString()
//       }
//     }
//   }
//   const typeDefs = [
//     schema.buildObjectType({
//       name: 'wordpress__wp_media',
//       fields: {
//         media_details: {
//           sizes: {
//             thumbnail: imageConsts,
//             medium_large: imageConsts,
//             full: imageConsts,
//           }
//         }
//       },
//       interfaces: ['Node'],
//       extensions: {
//         infer: false,
//       },
//     }),
//   ]
//   createTypes(typeDefs)
// }