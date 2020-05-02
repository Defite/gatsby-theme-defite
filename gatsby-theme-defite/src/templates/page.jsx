/** @jsx jsx */
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { jsx } from 'theme-ui';

import langs from '../langs/menuDict';

export const PageTemplate = (props) => {
	const { data, pageContext } = props;
	const { markdownRemark: page, site } = data;
	const { description, title } = site.siteMetadata;
	const { pageType } = pageContext;
	const siteDescription = page.excerpt || description;
	const { langKey } = page.fields;
	const authorName = langs[langKey].title || title;

	/* eslint-disable react/no-danger */
	return (
		<React.Fragment>
			<Helmet
				htmlAttributes={{ lang: langKey, class: `${pageType}` }}
				meta={[{ name: 'description', content: siteDescription }]}
				title={`${page.frontmatter.title} | ${authorName}`}
			/>
			<div className="grid">
				<div className="grid-inner">
					<h1 sx={{ variant: 'styles.h2' }}>{page.frontmatter.title}</h1>
					<p
						style={{
							display: 'block',
						}}
					>
						{page.frontmatter.date}
					</p>
					<div
						sx={{ variant: 'styles' }}
						dangerouslySetInnerHTML={{ __html: page.html }}
					/>
					<hr />
				</div>
			</div>
		</React.Fragment>
	);
};

export default PageTemplate;

export const pageQuery = graphql`
	query PageBySlug($path: String!) {
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
				date(formatString: "MMMM DD, YYYY")
			}
			fields {
				langKey
			}
		}
	}
`;
