import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import LangContext from '../context/langContext';
import Container from '../components/Container';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';
import { Styled } from 'theme-ui';
import menu from '../langs/menuDict';

import './layout.css';

const Template = (props) => {
	const { children, lang, location } = props;

	const defaultLang = Object.keys(menu)[0];
	const langPref = lang === defaultLang ? '' : `/${lang}`;

	const state = {
		defaultLang,
		lang,
		langPref,
		location,
	};

	return (
		<Styled.root>
			<LangContext.Provider value={state}>
				<div className="wrapper">
					<StaticQuery
						query={graphql`
							query HeadingQuery {
								site {
									siteMetadata {
										title
									}
								}
							}
						`}
						render={() => {
							const currLang = menu[lang];
							const menuItems = currLang.menu || [];

							return (
								<Header>
									<Navbar>
										<NavbarBrand langPrefix={langPref}>
											{currLang.title}
										</NavbarBrand>
										<NavbarMenu items={menuItems} />
									</Navbar>
								</Header>
							);
						}}
					/>
					<Container className="main">{children}</Container>
					<Footer lang={lang} />
				</div>
			</LangContext.Provider>
		</Styled.root>
	);
};

export default Template;
