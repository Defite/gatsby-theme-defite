const postcssPresetEnv = require('postcss-preset-env');
// const fetch = require('node-fetch');
// const { createHttpLink } = require('apollo-link-http');

module.exports = ({
	contentPath = '/content/',
	siteMetadata = {},
	pagesPaths = ['/pages/', '/posts/'],
	manifestOptions = {},
}) => ({
	siteMetadata,
	plugins: [
		'gatsby-plugin-theme-ui',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					// 'gatsby-remark-unwrap-images',
					'gatsby-remark-relative-source',
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 785,
							withWebp: {
								quality: 75,
							},
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: 'margin-bottom: 1.0725rem',
						},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-smartypants',
					'gatsby-remark-reading-time',
				],
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `./uploads`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `.${contentPath}pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `.${contentPath}posts`,
				name: 'posts',
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.inline\.svg$/,
				},
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: manifestOptions,
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-prefetch-google-fonts',
			options: {
				fonts: [
					{
						family: 'Nunito',
						subsets: ['cyrillic'],
						variants: ['400', '500', '600', '700', '800'],
					},
					{
						family: 'Source Sans Pro',
						subsets: ['cyrillic'],
						variants: ['400', '600', '700', '900'],
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-postcss',
			options: {
				postCssPlugins: [
					postcssPresetEnv({
						stage: 3,
						features: {
							'nesting-rules': true,
						},
					}),
				],
			},
		},
		{
			resolve: 'gatsby-plugin-i18n',
			options: {
				langKeyDefault: 'ru',
				useLangKeyLayout: false,
				pagesPaths,
			},
		},
		{
			resolve: 'gatsby-plugin-layout',
			options: {
				component: require.resolve('./src/components/layout.jsx'),
			},
		},
		'gatsby-plugin-offline',
	],
});
