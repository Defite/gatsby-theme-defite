import React from 'react';
import styles from './navbaritem.module.css';

const NavbarItem = (props) => {
	return <div className={styles.navbarItem}>{props.children}</div>;
};

export default NavbarItem;
