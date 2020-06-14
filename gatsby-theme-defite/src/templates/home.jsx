/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';

import styles from './home.module.css';

export const IndexPage = (props) => {
	const { data, pageContext } = props;
	const { siteMeta } = pageContext;
	const { home } = data;
	const { langKey } = home.fields;

	/* eslint-disable react/no-danger */
	return (
		<Layout {...props}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'home' }}
				meta={[{ name: 'description', content: siteMeta.description }]}
				title={`${home.frontmatter.title} | ${siteMeta.title}`}
			/>
			<div className="grid main">
				<section sx={{ variant: 'intro' }} className={styles.intro}>
					<div
						className={styles.inner}
						dangerouslySetInnerHTML={{ __html: home.html }}
					/>
				</section>
			</div>
		</Layout>
	);
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageData($path: String!) {
		home: markdownRemark(frontmatter: { path: { eq: $path } }) {
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
