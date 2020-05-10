import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Breakpoints from '../Breakpoints';
import styles from './burger.module.css';

const NavbarBurger = () => {
	const [activeClass, setClass] = useState({
		bodyClass: '',
		btnClass: '',
	});
	const isActiveClass = 'is-active';
	const isClosedClass = 'is-closed';

	const onButtonClick = () => {
		// Повесить класс на body
		setClass((prevState) => {
			const { bodyClass, btnClass } = prevState;

			return {
				bodyClass: bodyClass !== isActiveClass ? isActiveClass : isClosedClass,
				btnClass: btnClass !== isActiveClass ? isActiveClass : '',
			};
		});
	};

	useEffect(() => {
		document.body.className = activeClass.bodyClass;

		const timer = setTimeout(() => {
			if (activeClass.bodyClass === isClosedClass) {
				document.body.className = '';
			}
		}, 300);

		return () => {
			document.body.className = '';
			clearTimeout(timer);
		};
	});

	const rootBtnClass = classnames(styles.navbarBurger, {
		[styles.navbarBurgerIsActive]: activeClass.btnClass,
	});

	return (
		<Breakpoints visible={['touch']}>
			<button
				className={rootBtnClass}
				aria-label="menu"
				aria-expanded="false"
				onClick={onButtonClick}
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</button>
		</Breakpoints>
	);
};

export default NavbarBurger;
