/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

import NavbarBurger from '../NavbarBurger';
import NavbarItem from '../NavbarItem';

import styles from './navbarbrand.module.css';

const NavbarBrand = (props) => {
	const { children, langPrefix } = props;

	return (
		<div className={styles.navbarBrand}>
			<NavbarItem>
				<h4 sx={{ variant: 'header.logo' }} className={styles.logo}>
					<Link to={`${langPrefix}/`}>{children}</Link>
				</h4>
			</NavbarItem>
			<NavbarBurger />
		</div>
	);
};

export default NavbarBrand;
