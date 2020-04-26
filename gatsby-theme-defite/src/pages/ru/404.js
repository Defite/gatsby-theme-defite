/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import Layout from '@defite/gatsby-theme-defite/src/components/layout';

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<Layout location={location} title={siteTitle} lang="ru">
			<div className="grid main">
				<div className="grid-inner">
					<h1 sx={{ variant: 'error404.h2' }}>
						Ничего не найдено{' '}
						<span
							sx={{
								variant: 'error404.errorCode',
								color: 'rgb(142, 147, 155)',
							}}
						>
							&mdash; 404
						</span>
					</h1>
					<p sx={{ variant: 'error404.p' }}>Этой страницы не существует</p>
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
