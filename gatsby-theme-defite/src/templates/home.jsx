/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import langs from '../langs/menuDict';
import Layout from '../components/layout';
// import GithubRepoList from '../components/GithubRepoList';

import styles from './home.module.css';

export const IndexPage = (props) => {
	const { data, location } = props;
	const { /*github,*/ markdownRemark: page, site } = data;
	const { description, title } = site.siteMetadata;
	const { langKey } = page.fields;
	const authorName = langs[langKey].title || title;
	// const { edges: repos } = github.viewer.pinnedRepositories;

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
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
				{/* <section className="grid">
					<GithubRepoList repositories={repos} lang={langKey} />
				</section> */}
			</div>
		</Layout>
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
