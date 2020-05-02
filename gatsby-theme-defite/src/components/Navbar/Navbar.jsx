import React from 'react';
import Container from '../Container';
import styles from './navbar.module.css';

const Navbar = (props) => {
	return (
		<nav
			className={styles.navbar}
			role="navigation"
			aria-label="main navigation"
		>
			<Container className={styles.navbarContainer}>{props.children}</Container>
		</nav>
	);
};

export default Navbar;
