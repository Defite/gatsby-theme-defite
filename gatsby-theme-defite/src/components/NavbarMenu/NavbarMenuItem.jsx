/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Link } from 'gatsby';

import LangContext from '../../context/langContext';
import styles from './navbarmenu.module.css';

class NavbarMenuItem extends React.Component {
	static contextType = LangContext;

	render() {
		const { link, text } = this.props;
		const { langPref } = this.context;

		return (
			<li className={styles.item}>
				<Link
					to={`${langPref}/${link}`}
					sx={{
						variant: 'menu',
					}}
				>
					{text}
				</Link>
			</li>
		);
	}
}

export default NavbarMenuItem;
