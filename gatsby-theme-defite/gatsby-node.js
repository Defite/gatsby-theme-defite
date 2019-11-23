// const fs = require('fs');

// Check if the data dir exists
// exports.onPreBootstrap = ({ reporter }, options) => {
//   const contentPath = options.contentPath || 'data';

//   if (!fs.existsSync(contentPath)) {
//     reporter.info(`creating the ${contentPath} directory`);
//     fs.mkdirSync(contentPath);
//   }
// }

// Define the event type
// exports.sourceNodes = ({ actions }) => {
//   actions.createTypes(`
//     type Event implements Node @dontInfer {
//       id: ID!
//       name: String!
//       location: String!
//       startDate: Date! @dateformat @proxy(from: "start_date")
//       endDate: Date! @dateformat @proxy(from: "end_date")
//       url: String!
//       slug: String!
//     }
//   `)
// }

// Define resolvers for custom fields
// exports.createResolvers = ({ createResolvers }, options) => {
//   const basePath = options.basePath || '/';
//   const slugify = str => {
//     const slug = str
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)+/g, '');

//     return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
//   }

//   createResolvers({
//     Event: {
//       slug: {
//         resolve: source => slugify(source.name)
//       }
//     }
//   })
// }

// Query for data and create pages
// exports.createPages = async ({ actions, graphql, reporter }, options) => {
//   const basePath = options.basePath || '/';

//   actions.createPage({
//     path: basePath,
//     component: require.resolve('./src/templates/events.js')
//   });

//   const result = await graphql(`
//     query {
//       allEvent(sort: {fields: startDate, order: ASC}) {
//         nodes {
//           id
//           slug
//         }
//       }
//     }
//   `);

//   if(result.errors) {
//     reporter.panic('error loading events', reporter.errors);
//     return;
//   }

//   const events = result.data.allEvent.nodes;

//   events.forEach(event => {
//     const slug = event.slug;

//     actions.createPage({
//       path: slug,
//       component: require.resolve('./src/templates/event.js'),
//       context: {
//         eventID: event.id
//       }
//     })
//   })
// }

// const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogPost = require.resolve('./src/templates/blog-post.jsx');

	await graphql(`
        {
            site {
                siteMetadata {
                    title
                    author
                }
            }
            allMarkdownRemark (
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
              ) {
                edges {
                    node {
                        html
                        frontmatter {
                            templateKey
                            path
                            title
                        }
                        fields {
                            slug
                            langKey
                        }
                    }
                }
            }
        }
        `).then((result) => {
		const { edges } = result.data.allMarkdownRemark;

		// Create blog posts pages.
		const posts = edges.filter(({ node }) => node.frontmatter.templateKey === 'blog-post');

		posts.forEach((post, index) => {
			const previous = index === posts.length - 1 ? null : posts[index + 1].node;
			const next = index === 0 ? null : posts[index - 1].node;

			createPage({
				path: post.node.frontmatter.path,
				component: blogPost,
				context: {
					slug: post.node.fields.slug,
					previous,
					next,
					langKey: post.node.fields.langKey === 'en' ? 'en' : '',
				},
			});
		});

		// Create blog post list pages
		const postsPerPage = 5;
		['ru', 'en'].forEach((lang) => {
			const langPrefix = lang === 'en' ? 'en/' : '';
			const blogPosts = edges.filter(({ node }) => node.frontmatter.templateKey === 'blog-post' && node.fields.langKey === lang);
			const numPages = Math.ceil(blogPosts.length / postsPerPage);
			Array.from({ length: numPages }).forEach((_, i) => {
				createPage({
					path: i === 0 ? `${langPrefix}blog` : `${langPrefix}blog/${i + 1}`,
					component: require.resolve('./src/templates/blog.jsx'),
					context: {
						limit: postsPerPage,
						skip: i * postsPerPage,
						numPages,
						currentPage: i + 1,
						langKey: lang,
						pageTitle: lang === 'en' ? 'Blog' : 'Блог',
					},
				});
			});
		});

		result.data.allMarkdownRemark.edges.map(({ node }) => {
			if (!node.fields) {
				return false;
			}

			const templateName = String(node.frontmatter.templateKey);
			const { langKey } = node.fields;

			if (node.frontmatter.templateKey === 'blog') {
				return false;
			}

			return createPage({
				path: node.frontmatter.path,
				context: {
					slug: node.fields.slug,
					pageType: node.frontmatter.templateKey,
					langKey,
				},
				component: require.resolve(`./src/templates/${templateName}.jsx`),
			});
		});
	});
};

