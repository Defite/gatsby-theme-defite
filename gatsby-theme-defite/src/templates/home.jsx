/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import langs from '../langs/menuDict';
import styles from './home.module.css';

export const IndexPage = (props) => {
	const { markdownRemark: page, site } = props.data;
	const { description, title } = site.siteMetadata;
	const { langKey } = page.fields;
	const authorName = langs[langKey].title || title;

	/* eslint-disable react/no-danger */
	return (
		<div>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'home' }}
				meta={[{ name: 'description', content: description }]}
				title={`${page.frontmatter.title} | ${authorName}`}
			/>
			<div className="grid main">
				<section sx={{ variant: 'intro' }} className={styles.intro}>
					<div
						className={styles.inner}
						dangerouslySetInnerHTML={{ __html: page.html }}
					/>
				</section>
			</div>
		</div>
	);
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageData($path: String!) {
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
	}
`;
