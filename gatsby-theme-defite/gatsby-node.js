// gatsby-node.js
const { fmImagesToRelative } = require('gatsby-remark-relative-source');

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;

	const typeDefs = `
		type MarkdownRemark implements Node {
			frontmatter: Frontmatter
		}
		type Frontmatter {
			coverImg: File @fileByRelativePath
		}
	`;

	createTypes(typeDefs);
};

exports.onCreateNode = ({ node }) => {
	fmImagesToRelative(node);
};

exports.createPages = async ({ graphql, actions }, options) => {
	const { createPage } = actions;
	const blogPost = require.resolve('./src/templates/blog-post.jsx');
	const postsPerPage = options.postsPerPage || 5;
	const defaultLang = options.langs[0];

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
							category
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

		// Create blog posts pages
		// 1. Filter blog posts
		const posts = edges.filter(
			({ node }) => node.frontmatter.templateKey === 'blog-post',
		);

		// 2. Create blog post pages
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
					defaultLang,
				},
			});
		});

		const categories = edges.reduce((result, { node }) => {
			const category = node.frontmatter.category;
			if (category && result.indexOf(category) === -1) {
				result.push(category);
			}
			return result;
		}, []);

		// Create blog post listing pages

		// 1. Loop categories
		categories.forEach((category) => {
			// 2. Loop languages
			options.langs.forEach((lang) => {
				const langPrefix = lang === defaultLang ? '' : `${lang}/`;

				const blogPosts = edges.filter(
					({ node }) =>
						node.frontmatter.templateKey === 'blog-post' &&
						node.fields.langKey === lang &&
						node.frontmatter.published &&
						node.frontmatter.category === category,
				);

				const numPages = Math.ceil(blogPosts.length / postsPerPage);

				Array.from({ length: numPages }).forEach((_, i) => {
					createPage({
						path:
							i === 0
								? `${langPrefix}${category}/`
								: `${langPrefix}${category}/${i + 1}/`,
						component: require.resolve('./src/templates/blog.jsx'),
						context: {
							limit: postsPerPage,
							skip: i * postsPerPage,
							category: category,
							numPages,
							currentPage: i + 1,
							langKey: lang,
							defaultLang,
						},
					});
				});
			});
		});

		// Create any other page
		edges.map(({ node }) => {
			const { path, templateKey } = node.frontmatter;

			if (!node.fields) {
				return false;
			}

			if (templateKey === 'blog') {
				return false;
			}

			const templateName = String(templateKey);
			const { langKey, slug } = node.fields;

			return createPage({
				path: path,
				context: {
					slug,
					pageType: templateKey,
					langKey,
					defaultLang,
				},
				component: require.resolve(`./src/templates/${templateName}.jsx`),
			});
		});
	});
};

exports.onCreatePage = async ({ page, actions }, options) => {
	const { createPage, deletePage } = actions;
	const defaultLang = options.langs[0];

	if (page.path.match(/offline-plugin-app-shell-fallback/)) {
		const oldPage = { ...page };

		page.context = {
			defaultLang,
			langKey: defaultLang,
		};

		// Recreate the modified page
		deletePage(oldPage);
		createPage(page);
	}

	// Check if the page is a localized 404
	if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
		const oldPage = { ...page };
		// Get the language code from the path, and match all paths
		// starting with this code (apart from other valid paths)
		const langCode = page.path.split(`/`)[1];

		page.matchPath = defaultLang === langCode ? '/*' : `/${langCode}/*`;
		page.context.defaultLang = defaultLang;
		page.context.langKey = langCode;

		// Recreate the modified page
		deletePage(oldPage);
		createPage(page);
	}
};
