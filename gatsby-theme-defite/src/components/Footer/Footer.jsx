/** @jsx jsx */
import { jsx } from 'theme-ui';
import Container from '../Container';
import footerDict from '../../langs/footerDict';

import styles from './style.module.css';

const Footer = (props) => {
	const { lang = 'ru' } = props;
	const developer = footerDict[lang].developer;

	return (
		<footer className={styles.footer}>
			<Container>
				<div sx={{ variant: 'footer.text' }}>
					&copy; 2019 &mdash; 2020 {developer}
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
