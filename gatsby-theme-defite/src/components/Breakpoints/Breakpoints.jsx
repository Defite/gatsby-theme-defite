import React from 'react';
import classnames from 'classnames';
import styles from './breakpoints.module.css';

// Наборы
// touch: '(width < 768px)'
// tablet: '(width >= 768px) and (width < 1004px)'
// desktopSmall: '(width >= 1004px) and (width < 1260px)'
// desktopMedium: '(width >= 1260px)'

const Breakpoints = (props) => {
	const { visible, hidden, children, className } = props;

	let mediaQueriesList = ['touch', 'tablet', 'desktop', 'fullhd'];

	if (visible) {
		mediaQueriesList = mediaQueriesList.filter(
			(item) => visible.indexOf(item) === -1,
		);
	} else {
		mediaQueriesList = hidden || mediaQueriesList;
	}

	const classNames = classnames(
		mediaQueriesList.map((item) => styles[item]),
		className,
	);

	return <div className={classNames}>{children}</div>;
};

export default Breakpoints;
