/** @jsx jsx */
import { jsx } from 'theme-ui';
import styles from './bloglist.module.css';

import Card from '../Card';
import BlogPagination from '../BlogPagination';

export const BlogList = (props) => {
	const { blogTitle, pageContext, posts } = props;
	const { defaultLang, langKey, currentPage, numPages } = pageContext;
	const langPrefix = langKey === defaultLang ? '' : langKey;

	/* eslint-disable react/no-danger */
	return (
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
	);
};

export default BlogList;
