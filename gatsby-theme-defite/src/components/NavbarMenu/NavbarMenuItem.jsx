/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

import styles from './navbarmenu.module.css';

const NavbarMenuItem = (props) => {
	const { link, text } = props;

	return (
		<li className={styles.item}>
			<Link
				to={`${link}`}
				sx={{
					variant: 'menu',
				}}
			>
				{text}
			</Link>
		</li>
	);
};

export default NavbarMenuItem;
