const postcssPresetEnv = require('postcss-preset-env');

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
					'gatsby-remark-relative-source',
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 785,
							withWebp: {
								quality: 75,
							},
							linkImagesToOriginal: false,
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
					include: /assets\/inline/,
				},
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: manifestOptions,
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-web-font-loader',
			options: {
				google: {
					families: [
						'Nunito:400,500,600,700,800:cyrillic',
						'Source Sans Pro:400,600,700,900:cyrillic',
					],
				},
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
		'gatsby-plugin-offline',
	],
});
