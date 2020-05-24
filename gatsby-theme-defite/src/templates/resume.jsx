/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import styles from './resume.module.css';

export const ResumeTemplate = (props) => {
	const { data, pageContext } = props;
	const { page } = data;
	const { siteMeta, pageType } = pageContext;
	const siteDescription = page.excerpt || siteMeta.description;
	const { langKey } = page.fields;

	/* eslint-disable react/no-danger */
	return (
		<React.Fragment>
			<Helmet
				htmlAttributes={{ lang: langKey, class: `${pageType}` }}
				meta={[{ name: 'description', content: siteDescription }]}
				title={`${page.frontmatter.title} | ${siteMeta.title}`}
			/>
			<div className="grid">
				<div className="grid-inner">
					<div
						className={styles.resume__body}
						dangerouslySetInnerHTML={{ __html: page.html }}
						sx={{
							variant: 'cv',
						}}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ResumeTemplate;

export const pageQuery = graphql`
	query ResumeData($path: String!) {
		page: markdownRemark(frontmatter: { path: { eq: $path } }) {
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
