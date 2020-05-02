/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Link } from 'gatsby';
import styles from './style.module.css';
import LangContext from '../../context/langContext';
import langs from '../../langs/menuDict';

class LanguageSwitcher extends React.Component {
	static contextType = LangContext;

	render() {
		const { defaultLang, lang, location } = this.context;
		// const slug = location.pathname.replace(`/${lang}/`, '/');
		const langsAliases = Object.keys(langs);

		return (
			<span className={styles.switcher}>
				{langsAliases.map((alias, index) => {
					return (
						<Link
							key={`lang-${index}`}
							// to={defaultLang === alias ? slug : '/' + alias + slug}
							to={alias}
							activeClassName={styles.active}
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
}

export default LanguageSwitcher;
