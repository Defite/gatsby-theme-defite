/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Styled } from 'theme-ui';

import Layout from '../components/layout';
import BlogPagination from '../components/BlogPagination';

export const BlogIndex = (props) => {
	const { data, location, pageContext } = props;
	const { site, allMarkdownRemark } = data;
	const { title, description } = site.siteMetadata;
	const posts = allMarkdownRemark.edges;
	const {
		langKey,
		pageTitle,
		currentPage,
		numPages,
	} = pageContext;
	const langPrefix = langKey === 'en' ? 'en' : '';

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog' }}
				meta={[{ name: 'description', content: description }]}
				title={`${pageTitle} | ${title}`}
			/>
			<div className="grid">
				<div className="grid-inner">
					<section className="blog-list">
						{posts.map(({ node }) => {
							const customTitle = node.frontmatter.title || node.fields.slug;
							return (
								<div key={node.fields.slug}>
									<Styled.h3
										sx={{
											marginBottom: '0.455rem',
										}}
									>
										<Link style={{ boxShadow: 'none' }} to={node.frontmatter.path}>
											{customTitle}
										</Link>
									</Styled.h3>
									<small>{node.frontmatter.date}</small>
									<Styled.p dangerouslySetInnerHTML={{ __html: node.frontmatter.excerpt }} />
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
			</div>
		</Layout>
	);
};

/* eslint-disable react/forbid-prop-types */
BlogIndex.defaultProps = {
	location: {},
};

BlogIndex.propTypes = {
	location: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
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
						templateKey: { eq: "blog-post" },
						status: { eq: "published" } 
					},
					fields: { langKey: { eq: $langKey } },
				}
				sort: { fields: [frontmatter___date], order: DESC }
				limit: $limit
				skip: $skip
			) {
			edges {
				node {
					excerpt
					fields {
						slug
						langKey
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY", locale: $langKey)
						title
						templateKey
						status
						path
						excerpt
					}
				}
			}
		}
	}
`;
