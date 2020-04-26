// gatsby-node.js
// exports.createSchemaCustomization = ({ actions }) => {
// 	const { createTypes } = actions;

// 	const typeDefs = [
// 		`type MarkdownRemark implements Node {
// 			frontmatter: Frontmatter
// 			}`,
// 		`type Frontmatter @infer {
// 					coverImg: [File!]! @fileByRelativePath,
// 			}`,
// 	];

// 	createTypes(typeDefs);
// };

const { fmImagesToRelative } = require('gatsby-remark-relative-source');

exports.onCreateNode = ({ node }) => {
	fmImagesToRelative(node);
};

exports.createPages = async ({ graphql, actions }, options) => {
	const { createPage } = actions;
	const blogPost = require.resolve('./src/templates/blog-post.jsx');
	const postsPerPage = options.postsPerPage || 5;

	await graphql(`
		{
			site {
				siteMetadata {
					title
					author
				}
			}
			allMarkdownRemark(
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
							published
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
		const posts = edges.filter(
			({ node }) => node.frontmatter.templateKey === 'blog-post',
		);
		const defaultLang = options.langs[0];

		posts.forEach((post, index) => {
			const previous =
				index === posts.length - 1 ? null : posts[index + 1].node;
			const next = index === 0 ? null : posts[index - 1].node;

			const { langKey, slug } = post.node.fields;

			createPage({
				path: post.node.frontmatter.path,
				component: blogPost,
				context: {
					slug,
					previous,
					next,
					langKey: langKey === defaultLang ? '' : langKey,
				},
			});
		});

		// Create blog post list pages
		options.langs.forEach((lang) => {
			const langPrefix = lang === defaultLang ? '' : `${lang}/`;

			const blogPosts = edges.filter(
				({ node }) =>
					node.frontmatter.templateKey === 'blog-post' &&
					node.fields.langKey === lang &&
					node.frontmatter.published,
			);

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

exports.onCreatePage = async ({ page, actions }, options) => {
	const { createPage, deletePage } = actions;
	const defaultLang = options.langs[0];

	// Check if the page is a localized 404
	if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
		const oldPage = { ...page };
		// Get the language code from the path, and match all paths
		// starting with this code (apart from other valid paths)
		const langCode = page.path.split(`/`)[1];

		page.matchPath = defaultLang === langCode ? '/*' : `/${langCode}/*`;
		// Recreate the modified page
		deletePage(oldPage);
		createPage(page);
	}
};
