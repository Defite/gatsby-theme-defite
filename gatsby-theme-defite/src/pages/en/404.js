/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<Layout location={location} title={siteTitle} lang="en">
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
		</Layout>
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
