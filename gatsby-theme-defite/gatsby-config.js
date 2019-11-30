const postcssPresetEnv = require('postcss-preset-env');
const defaultMenu = require('./site.lang');
const path = require('path');

module.exports = ({ contentPath = '/content/', menu = defaultMenu }) => ({
  siteMetadata: {
    title: 'Nikita Makhov',
    author: 'Nikita Makhov',
    description: 'Frontend developer blog',
    siteUrl: 'https://defite.ru'
  },
  plugins: [
    'gatsby-theme-ui',
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
        path: './content/pages',
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './content/posts',
        name: 'posts'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-source',
          'gatsby-remark-unwrap-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2560
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Nikita Makhov',
        short_name: 'Defite.ru',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'assets/gatsby-icon.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Fira Sans',
            subsets: ['cyrillic'],
            variants: ['400', '500', '600', '700', '800']
          },
          {
            family: 'Merriweather',
            subsets: ['cyrillic'],
            variants: ['400', '700']
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            stage: 3,
            features: {
              'nesting-rules': true
            }
          })
        ]
      }
    },
    // {
    //   resolve: 'gatsby-source-graphql',
    //   options: {
    //     fieldName: 'github',
    //     typeName: 'GitHub',
    //     createLink: () =>
    //       createHttpLink({
    //         uri: 'https://api.github.com/graphql',
    //         headers: {
    //           Authorization: `bearer ${process.env.APP_GITHUB_TOKEN}`
    //         },
    //         fetch
    //       })
    //   }
    // },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'ru',
        useLangKeyLayout: false,
        pagesPaths: ['/pages/', '/posts/']
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-143754409-1'
      }
    }
  ]
});
