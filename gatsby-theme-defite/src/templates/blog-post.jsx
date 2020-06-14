/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import plural from '../helpers/plural';
import postDict from '../langs/postDict';
import styles from './blog-post.module.css';

export const BlogPostTemplate = (props) => {
	const { pageContext } = props;
	const { siteMeta } = pageContext;
	const { post } = props.data;
	const { title, published, date } = post.frontmatter;
	const siteDescription = post.excerpt;
	const { langKey, readingTime } = post.fields;
	const isPublished = published;

	const renderReadingTime = () => {
		if (!readingTime || !readingTime.minutes) {
			return null;
		}

		const minutes = Math.ceil(readingTime.minutes);
		const { cases, postfix, prefix } = postDict[langKey].timeRead;

		return (
			<React.Fragment>
				<span className={styles.metaSeparator}> &mdash; </span>
				<span>
					{prefix} {minutes} {plural(minutes, cases)} {postfix}
				</span>
			</React.Fragment>
		);
	};

	const renderSubtitleInfo = () => {
		if (!isPublished) {
			return null;
		}

		return (
			<div className={styles.time} sx={{ variant: 'post.postMeta' }}>
				<time>{date}</time>
				{renderReadingTime()}
			</div>
		);
	};

	/* eslint-disable react/no-danger */
	return (
		<Layout {...props}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog-post' }}
				meta={[{ name: 'description', content: siteDescription }]}
				title={`${title} | ${siteMeta.title}`}
			/>

			<div className={styles.post}>
				<header className={styles.header}>
					<h1
						sx={{ variant: 'post.h1', marginBottom: '0.3em' }}
						className={styles.h1}
					>
						{title}
					</h1>
					{renderSubtitleInfo()}
				</header>

				<div
					sx={{ variant: 'post' }}
					className={styles.article}
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>
			</div>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($langKey: String!, $path: String!) {
		post: markdownRemark(frontmatter: { path: { eq: $path } }) {
			id
			excerpt
			html
			fields {
				langKey
				readingTime {
					minutes
				}
			}
			frontmatter {
				title
				published
				date(formatString: "DD.MM.YY", locale: $langKey)
			}
		}
	}
`;
