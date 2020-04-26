import React from 'react';

import LanguageSwitcher from '../LanguageSwitcher';
import NavbarMenuItem from './NavbarMenuItem';
import NavbarItem from '../NavbarItem';

import styles from './navbarmenu.module.css';
import LangContext from '../../context/langContext';

class NavbarMenu extends React.Component {
	static contextType = LangContext;

	render() {
		const { items } = this.props;
		const { lang } = this.context;

		return (
			<div className={styles.navbarMenu}>
				<div className={styles.navbarStart}>
					<ul>
						{items.map((item, index) => (
							<NavbarMenuItem
								link={item.link}
								text={item.text}
								lang={lang}
								key={`menu-item-${index}`}
							/>
						))}
					</ul>
				</div>
				<div className={styles.navbarEnd}>
					<NavbarItem>
						<LanguageSwitcher />
					</NavbarItem>
				</div>
			</div>
		);
	}
}

export default NavbarMenu;
