/** @jsx jsx */
import { jsx } from 'theme-ui';
import Container from '../Container';
import footerDict from '../../langs/footerDict';

import styles from './style.module.css';

const Footer = (props) => {
	const { lang } = props;
	const developer = footerDict[lang].developer;
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();


	return (
		<footer className={styles.footer}>
			<Container>
				<div sx={{ variant: 'footer.text' }}>
					&copy; {currentYear} {developer}
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
