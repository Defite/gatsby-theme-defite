# Gatsby theme for Defite.ru

![Gatsby theme for Defite.ru](https://user-images.githubusercontent.com/299118/70140860-ba0cba80-16a6-11ea-82c2-f28a865487c5.png)

**[Preview live site](https://defite.ru/en/)**

## Why?

I wanted to store theme files separate from content files.

## Installation

### You don't have Gatsby site

```
npm i --save react react-dom gatsby @defite/gatsby-theme-defite
```

### You already have Gatsby site

```
npm i --save @defite/gatsby-theme-defite
```

In both cases copy contents of `site` folder from the repository into your gatsby folder and replace example content with yours.

## Config

`gatsby-config.js` is a bit messy, but it's working and once you've configured it, you won't touch it anymore.

```
const menu = require('./src/@defite/gatsby-theme-defite/langs/menu');
const langs = Object.keys(menu);

module.exports = {
    plugins: [
        {
            resolve: '@defite/gatsby-theme-defite',
            options: {
                contentPath: '/content/', //root folder for posts and pages
                siteMetadata: {
                    title: 'Nikita Makhov',
                    author: 'Nikita Makhov',
                    description: 'Frontend developer blog',
                    siteUrl: 'https://defite.ru',
                },
                manifestOptions: {
                    name: 'Nikita Makhov',
                    short_name: 'Defite.ru',
                    start_url: '/',
                    background_color: '#ffffff',
                    theme_color: '#663399',
                    display: 'minimal-ui',
                    icon: 'assets/gatsby-icon.png'
                },
                langs // your menu, title of page etc.
            }
        }
    ]
}
```

## Language support

The theme supports different languages. It also works with a single language.

To support multiple languages you must follow steps:

1) Open `src/@defite/gatsby-theme-defite/langs/menu.js` and add a new key for your language. On my page I use English and Russian:

```
module.exports = {
	ru: {
		title: 'Никита Махов',
		menu: [
			{
				text: 'Главная',
				link: '/',
			},
			{
				text: 'Блог',
				link: 'blog',
			},
			{
				text: 'Обо мне',
				link: 'about',
			},
			{
				text: 'Резюме',
				link: 'cv',
			},
		],
	},
	en: {
		title: 'Nikita Makhov',
		menu: [
			{
				text: 'Home',
				link: '/',
			},
			{
				text: 'Blog',
				link: 'blog',
			},
			{
				text: 'About',
				link: 'about',
			},
		],
	},
};

```

Fist language in this file will be the default for the system and will be shown on `/` urls. The other (in my case it is English) will be shown on `/en/` url.

### Translate pages

To translate the page for both English and Russian, I've created two Markdown pages like this:

```
- content
  - pages
    home.en.md
    home.ru.md
```

Insude `home.en.md` you will find this:

```
---
templateKey: home
path: /en/
title: Home
---
```

For russian (or default) I use this template:

```
---
templateKey: home
path: /
title: Home
---
```

### Translate posts

Posts dir have a little bit different structure:

```
- content
  - posts
    - en
      - hello-world.en.md
    - ru
      - hello-world.ru.md
```

I did this not to create chaos inside the posts directory. I hope it will fit everybody's needs.

Inside `hello-worlds.ru.md` you'll find:

 ```
 ---
templateKey: blog-post
path: /blog/hello-world
title: Hello world
excerpt: console.log('Hello world');
date: "2018-01-02T08:45:09.284Z"
published: true
---
```

`published` key is for making published or draft posts. It is convenient for systems like [Forestry](https://forestry.io).

`excerpt` key is for making short descriptions of the post in the blog listing page.
