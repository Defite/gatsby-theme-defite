/** @jsx jsx */
import { jsx } from 'theme-ui';

import { useContext } from 'react';
import { Link } from 'gatsby';
import styles from './languageswitcher.module.css';
import LangContext from '../../context/langContext';

const LanguageSwitcher = () => {
	const { defaultLang, lang, langs } = useContext(LangContext);

	if (!langs || langs.length < 2) {
		return null;
	}

	return (
		<span className={styles.switcher}>
			{langs.map((alias, index) => {
				return (
					<Link
						key={`lang-${index}`}
						to={defaultLang === alias ? '/' : '/' + alias}
						activeClassName={styles.active}
						partiallyActive={lang === alias}
						sx={{
							variant: 'header.switcher',
						}}
					>
						{alias}
					</Link>
				);
			})}
		</span>
	);
}

export default LanguageSwitcher;
