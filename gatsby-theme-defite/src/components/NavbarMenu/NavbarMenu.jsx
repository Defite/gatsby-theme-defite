import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageSwitcher from '../LanguageSwitcher';
import NavbarMenuItem from './NavbarMenuItem';
import NavbarItem from '../NavbarItem';

import styles from './navbarmenu.module.css';
import LangContext from '../../context/langContext';

const NavbarMenu = () => {
	const { lang } = useContext(LangContext);

	const data = useStaticQuery(graphql`
		query MenuQuery {
			menu: allMarkdownRemark(
				sort: { fields: [frontmatter___menuOrder], order: ASC }
				filter: {
					frontmatter: {
						templateKey: { ne: "blog-post" }
						showInMenu: { eq: true }
					}
				}
				limit: 1000
			) {
				edges {
					node {
						frontmatter {
							path
							title
						}
						fields {
							langKey
						}
					}
				}
			}
		}
	`);

	const { edges: menuItems } = data.menu;

	const langMenuItems = menuItems
		.filter((item) => {
			return item.node.fields.langKey === lang;
		})
		.map((item, index) => (
			<NavbarMenuItem
				link={item.node.frontmatter.path}
				text={item.node.frontmatter.title}
				lang={lang}
				key={`menu-item-${index}`}
			/>
		));

	return (
		<div className={styles.navbarMenu}>
			<div className={styles.navbarStart}>
				<ul>{langMenuItems}</ul>
			</div>
			<div className={styles.navbarEnd}>
				<NavbarItem>
					<LanguageSwitcher />
				</NavbarItem>
			</div>
		</div>
	);
};

export default NavbarMenu;
