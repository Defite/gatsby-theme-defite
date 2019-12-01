import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import LangContext from '../context/langContext';
import Header from './Header';
import Menu from './Menu';
import { Styled } from 'theme-ui';
import menu from '../langs/menu';

import './layout.css';

const menuOpenCls = 'menu-visible';

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

	const handleMenuToggle = (event) => {
		const isWrapper = event.target.getAttribute('class') === 'wrapper';
		const isMenuVisible = document.body.classList.contains(menuOpenCls);

		if (isWrapper && isMenuVisible) {
			document.body.classList.remove(menuOpenCls);
		}
	};

	return (
		<Styled.root>
			<LangContext.Provider value={state}>
				{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
				<div className="wrapper" onClick={handleMenuToggle} onKeyDown={handleMenuToggle}>
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
								<Header title={currLang.title}>
									<Menu items={menuItems} />
								</Header>
							)}
						}
					/>
					{children}
				</div>
			</LangContext.Provider>
		</Styled.root>
		
	);
};

export default Template;
