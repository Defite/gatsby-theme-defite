/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';

const NotFoundPage = () => {
	return (
		<React.Fragment>
			<div className="grid main">
				<div className="grid-inner">
					<h1 sx={{ variant: 'error404.h2' }}>
						Not Found{' '}
						<span
							sx={{
								variant: 'error404.errorCode',
								color: 'rgb(142, 147, 155)',
							}}
						>
							&mdash; 404
						</span>
					</h1>
					<p sx={{ variant: 'error404.p' }}>This page was never here before</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default NotFoundPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
