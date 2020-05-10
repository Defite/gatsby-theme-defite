import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import LangContext from '../context/langContext';
import Container from '../components/Container';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import NarbarBurger from './NavbarBurger';
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';
import { Styled } from 'theme-ui';
import menu from '../langs/menuDict';
import Transition from './transition.js';

import './layout.css';

const Layout = (props) => {
	const { children, pageContext, location } = props;
	const { defaultLang, langKey } = pageContext;
	const langPref = langKey === defaultLang ? '' : `/${langKey}`;

	const langDefaultData = {
		lang: langKey,
		langPref,
		defaultLang,
	};

	const currLang = menu[langKey] || menu[defaultLang];
	const menuItems = currLang.menu || [];

	return (
		<Styled.root>
			<LangContext.Provider value={langDefaultData}>
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
							return (
								<Header>
									<Navbar>
										<NavbarBrand title={currLang.title} langPrefix={langPref}>
											<Transition location={location} timeout={100}>
												<NarbarBurger />
											</Transition>
										</NavbarBrand>
										<NavbarMenu items={menuItems} />
									</Navbar>
								</Header>
							);
						}}
					/>

					<Container className="main">
						<Transition location={location}>{children}</Transition>
					</Container>
					<Footer lang={langKey} />
				</div>
			</LangContext.Provider>
		</Styled.root>
	);
};

export default Layout;
