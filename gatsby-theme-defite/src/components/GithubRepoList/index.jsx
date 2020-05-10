/** @jsx jsx */
import { jsx } from 'theme-ui';
import translate from './github.lang';
import styles from './style.module.css';

/* eslint-disable react/no-danger */
const GithubRepoList = ({ repositories, lang }) => (
	<section className={styles.github}>
		<h3 sx={{ variant: 'styles.h3' }}>{translate[lang].title}</h3>
		<div className={styles.list}>
			{repositories.map((repository, index) => {
				const key = `repo-item-${index}`;

				return (
					<div className={styles.repo} key={key}>
						<h4 sx={{ variant: 'styles.h4' }}>
							<a href={repository.node.url}>{repository.node.name}</a>
						</h4>
						<div sx={{ variant: 'styles.p' }} dangerouslySetInnerHTML={{ __html: repository.node.descriptionHTML }} />
					</div>
				);
			})}
		</div>
	</section>
);

export default GithubRepoList;
