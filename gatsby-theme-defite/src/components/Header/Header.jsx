/** @jsx jsx */
import { jsx } from 'theme-ui';
import styles from './header.module.css';

const Header = (props) => {
	return <header className={styles.header}>{props.children}</header>;
};

export default Header;
