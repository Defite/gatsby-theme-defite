/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import NavbarItem from '../NavbarItem';

import styles from './navbarbrand.module.css';

const NavbarBrand = (props) => {
	const { children, langPrefix, title } = props;

	return (
		<div className={styles.navbarBrand}>
			<NavbarItem>
				<h4 sx={{ variant: 'header.logo' }} className={styles.logo}>
					<Link to={`${langPrefix}/`}>{title}</Link>
				</h4>
			</NavbarItem>
			{children}
		</div>
	);
};

export default NavbarBrand;
