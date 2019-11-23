import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Styled } from 'theme-ui';
import styles from './blog-post.module.css';

export const BlogPostTemplate = (props) => {
	const { data, location } = props;
	const { site, markdownRemark: post } = data;
	const { title, status, date } = post.frontmatter;

	const { title: siteTitle } = site.siteMetadata;
	const siteDescription = post.excerpt;

	const { langKey } = post.fields;

	const errorTexts = {
		en: 'Sorry, this post is not available, try another language.',
		ru: 'Извините, этот пост еще не написан, попробуйте выбрать другой язык.',
	};

	const isPublished = status === 'published';

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog-post' }}
				meta={[{ name: 'description', content: siteDescription }]}
				title={`${title} | ${siteTitle}`}
			/>

			<div className={styles.post}>
				<header className={styles.header}>
					<Styled.h1 className={styles.h1}>{title}</Styled.h1>
					{isPublished && <time className={styles.time}>{date}</time>}
				</header>
				{isPublished
					? (<div className={styles.article} dangerouslySetInnerHTML={{ __html: post.html }} />)
					: (<div className={styles.article}><p>{errorTexts[langKey]}</p></div>)
				}
			</div>
		</Layout>
	);
};

/* eslint-disable react/forbid-prop-types */
BlogPostTemplate.defaultProps = {
	data: {},
	location: {},
};

BlogPostTemplate.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($langKey: String!, $path: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			id
			excerpt
			html
			fields {
				langKey
			}
			frontmatter {
				title
				status
				date(formatString: "MMMM DD, YYYY", locale: $langKey)
			}
		}
	}
`;
