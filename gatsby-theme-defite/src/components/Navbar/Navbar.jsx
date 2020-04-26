import React from 'react';
import Container from '../Container';

import styles from './navbar.module.css';

const Navbar = (props) => {
	const { children } = props;

	return (
		<nav
			className={styles.navbar}
			role="navigation"
			aria-label="main navigation"
		>
			<Container className={styles.navbarContainer}>{children}</Container>
		</nav>
	);
};

export default Navbar;
