/** @jsx jsx */
import { jsx } from 'theme-ui';
import Container from '../Container';
import footerDict from '../../langs/footerDict';
import GatsbyIcon from '../../assets/inline/gatsby.svg';
import VercelIcon from '../../assets/inline/vercel.svg';

import styles from './style.module.css';

const iconSizes = {
	width: 16,
	height: 16,
}

const Footer = (props) => {
	const { lang } = props;
	const { developer, deploy, works } = footerDict[lang];
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	return (
		<footer className={styles.footer}>
			<Container>
				<div sx={{ variant: 'footer.text' }} className={styles.footerUpper}>
					<div className={styles.footerSection}>
						&copy; {currentYear} {developer}
					</div>
					{works}{' '}
					<a href="https://www.gatsbyjs.org/">
						<GatsbyIcon {...iconSizes} />
					</a>
					, {deploy}{' '}
					<a href="https://vercel.com/">
						<VercelIcon {...iconSizes} />
					</a>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
