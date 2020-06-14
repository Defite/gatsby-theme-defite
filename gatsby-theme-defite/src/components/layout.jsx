import React from 'react';
import LangContext from '../context/langContext';
import Container from '../components/Container';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import NarbarBurger from './NavbarBurger';
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';
import { Styled } from 'theme-ui';

import './layout.css';

const Layout = (props) => {
	const { children, pageContext } = props;
	const { defaultLang, langKey, siteMeta, langs } = pageContext;
	const langPref = langKey === defaultLang ? '' : `/${langKey}`;

	const langDefaultData = {
		lang: langKey,
		langPref,
		defaultLang,
		langs,
	};

	return (
		<Styled.root>
			<LangContext.Provider value={langDefaultData}>
				<div className="wrapper">
					<Header>
						<Navbar>
							<NavbarBrand title={siteMeta.title} langPrefix={langPref}>
								<NarbarBurger />
							</NavbarBrand>
							<NavbarMenu />
						</Navbar>
					</Header>

					<Container className="main">{children}</Container>
					<Footer lang={langKey} />
				</div>
			</LangContext.Provider>
		</Styled.root>
	);
};

export default Layout;
