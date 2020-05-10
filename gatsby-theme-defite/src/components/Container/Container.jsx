import React from 'react';
import classnames from 'classnames';
import styles from './container.module.css';

const Container = (props) => {
	const { children, className } = props;
	const rootClassName = classnames(styles.container, className);

	return <div className={rootClassName}>{children}</div>;
};

export default Container;
