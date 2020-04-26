import React from 'react';
import { Link } from 'gatsby';
import CoverImage from 'gatsby-image';
import classnames from 'classnames';
import styles from './card.module.css';

const Card = ({ image, link, title }) => {
	const cardClass = classnames(styles.card, {
		[styles.hasImage]: Boolean(image),
	});

	/**
	 * Render 'background' image
	 */
	const renderImage = () => {
		if (!image) {
			return null;
		}

		return (
			<figure className={styles.cardFigure}>
				{/* <img className={styles.cardImage} src={image} alt={title} /> */}
				<CoverImage fluid={image} />
			</figure>
		);
	};

	return (
		<div className={cardClass}>
			{renderImage()}
			<div className={styles.cardContent}>
				<h4 className={styles.cardTitle}>
					<Link className={styles.cardTitleLink} to={link}>
						{title}
					</Link>
				</h4>
				{/* <p className="subtitle">{text}</p> */}
			</div>
			{/* <footer className={styles.cardFooter}>
				<p className={styles.cardFooterItem}>
					<span>
						View on{' '}
						<a href="#">
							Twitter
						</a>
					</span>
				</p>
				<p className={styles.cardFooterItem}>
					<span>
						Share on <a href="#">Facebook</a>
					</span>
				</p>
			</footer> */}
		</div>
	);
};

export default Card;
