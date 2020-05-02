/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styles from './blog.module.css';

import Card from '../components/Card';
import BlogPagination from '../components/BlogPagination';
import langs from '../langs/menuDict';

export const BlogIndex = (props) => {
	const { data, location, pageContext } = props;
	const { site, allMarkdownRemark } = data;
	const { description, title } = site.siteMetadata;
	const posts = allMarkdownRemark.edges;
	const { langKey, currentPage, numPages } = pageContext;

	const defaultLang = Object.keys(langs)[0];
	const langPrefix = langKey === defaultLang ? '' : langKey;
	const blogItemIndex = langs[langKey].menu.findIndex(
		(item) => item.link === 'blog',
	);
	const blogTitle = langs[langKey].menu[blogItemIndex].text;
	const authorName = langs[langKey].title || title;

	/* eslint-disable react/no-danger */
	return (
		<React.Fragment>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog' }}
				meta={[{ name: 'description', content: description }]}
				title={`${blogTitle} | ${authorName}`}
			/>
			<div className="grid main">
				<h1 sx={{ variant: 'styles.h2' }}>{blogTitle}</h1>
				<section sx={{ variant: 'blog' }} className={styles.blogList}>
					{posts.map(({ node }) => {
						const { path, coverImg, title } = node.frontmatter;
						const cover = coverImg ? coverImg.childImageSharp.fluid : null;

						return (
							<div className={styles.blogListItem} key={node.fields.slug}>
								<Card link={path} title={title} image={cover} />
							</div>
						);
					})}
				</section>

				<BlogPagination
					currentPage={currentPage}
					numPages={numPages}
					langPrefix={langPrefix}
				/>
			</div>
		</React.Fragment>
	);
};

export default BlogIndex;

export const BlogIndexData = graphql`
	query blogData($skip: Int!, $limit: Int!, $langKey: String!) {
		site {
			siteMetadata {
				title
				description
			}
		}
		allMarkdownRemark(
			filter: {
				frontmatter: {
					templateKey: { eq: "blog-post" }
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
