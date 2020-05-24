/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import BlogList from '../components/BlogList';

export const BlogIndex = (props) => {
	const { data, pageContext } = props;
	const { blog, posts } = data;
	const { edges } = posts;
	const { langKey, siteMeta } = pageContext;

	const pageTitle = blog.frontmatter.title;

	/* eslint-disable react/no-danger */
	return (
		<React.Fragment>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog' }}
				meta={[{ name: 'description', content: siteMeta.description }]}
				title={`${pageTitle} | ${siteMeta.title}`}
			/>
			<BlogList blogTitle={pageTitle} posts={edges} {...props} />
		</React.Fragment>
	);
};

export default BlogIndex;

export const BlogIndexData = graphql`
	query blogData(
		$skip: Int!
		$limit: Int!
		$langKey: String!
		$path: String!
		$category: String!
	) {
		blog: markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			fields {
				langKey
			}
			frontmatter {
				title
				path
			}
		}
		posts: allMarkdownRemark(
			filter: {
				frontmatter: {
					templateKey: { eq: "blog-post" }
					category: { eq: $category }
					published: { eq: true }
				}
				fields: { langKey: { eq: $langKey } }
			}
			sort: { fields: [frontmatter___date], order: DESC }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					fields {
						slug
						langKey
					}
					frontmatter {
						date(formatString: "DD.MM.YY", locale: $langKey)
						excerpt
						title
						templateKey
						published
						path
						coverImg {
							childImageSharp {
								fluid(maxWidth: 700) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				}
			}
		}
	}
`;
