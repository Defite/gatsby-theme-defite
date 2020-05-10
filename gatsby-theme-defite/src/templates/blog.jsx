/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import BlogList from '../components/BlogList';
import langs from '../langs/menuDict';

export const BlogIndex = (props) => {
	const { data, pageContext } = props;
	const { site, markdownRemark, allMarkdownRemark } = data;
	const { description, title } = site.siteMetadata;
	const posts = allMarkdownRemark.edges;
	const { langKey } = pageContext;

	const pageTitle = markdownRemark.frontmatter.title;
	const authorName = langs[langKey].title || title;

	/* eslint-disable react/no-danger */
	return (
		<React.Fragment>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog' }}
				meta={[{ name: 'description', content: description }]}
				title={`${pageTitle} | ${authorName}`}
			/>
			<BlogList blogTitle={pageTitle} langs={langs} posts={posts} {...props} />
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
		site {
			siteMetadata {
				title
				description
			}
		}
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			fields {
				langKey
			}
			frontmatter {
				title
				path
			}
		}
		allMarkdownRemark(
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
