import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import langs from '../langs/menu';
import Layout from '../components/layout';

import styles from './resume.module.css';


export const ResumeTemplate = (props) => {
	const { data, pageContext, location } = props;
	const { markdownRemark: page, site } = data;
	const { description, title } = site.siteMetadata;
	const { pageType } = pageContext;
	const siteDescription = page.excerpt || description;
	const { langKey } = page.fields;
	const authorName = langs[langKey].title || title;

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: `${pageType}` }}
				meta={[{ name: 'description', content: siteDescription }]}
				title={`${page.frontmatter.title} | ${authorName}`}
			/>
			<div className="grid">
				<div className="grid-inner">
					<div
						className={styles.resume__body}
						dangerouslySetInnerHTML={{ __html: page.html }}
					/>
					<hr />
				</div>
			</div>
		</Layout>
	);
};

/* eslint-disable react/forbid-prop-types */
ResumeTemplate.defaultProps = {
	data: {},
	location: {},
	pageContext: {},
};

ResumeTemplate.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
	pageContext: PropTypes.object,
};

export default ResumeTemplate;

export const pageQuery = graphql`
	query ResumeData($path: String!) {
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
			frontmatter {
				title
			}
			fields {
				langKey
			}
		}
	}
`;
