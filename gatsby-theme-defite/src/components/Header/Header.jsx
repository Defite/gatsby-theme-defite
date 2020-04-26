/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import LangContext from '../../context/langContext';

import styles from './header.module.css';

class Header extends React.Component {
	static contextType = LangContext;

	render() {
		const { children } = this.props;

		return <header className={styles.header}>{children}</header>;
	}
}

export default Header;
