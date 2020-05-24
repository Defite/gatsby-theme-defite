# Gatsby theme for Defite.ru

![Gatsby theme for Defite.ru](https://user-images.githubusercontent.com/299118/82766238-0d75ef00-9e26-11ea-9a93-4c46a384273d.png)

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
module.exports = {
    plugins: [
        {
            resolve: '@defite/gatsby-theme-defite',
            options: {
                contentPath: '/content/', //root folder for posts and pages
                siteMetadata: {
                    en: {
                      title: 'John Doe',
                      description: 'Another Gatsby site',
                    },
                    siteUrl: 'https://another-gatsby-site.com',
                },
                manifestOptions: {
                    name: 'John Doe',
                    short_name: 'John Doe',
                    start_url: '/',
                    background_color: '#ffffff',
                    theme_color: '#663399',
                    display: 'minimal-ui',
                    icon: 'assets/gatsby-icon.png'
                },
                langs: ['en'] // your menu, title of page etc.
            }
        }
    ]
}
```

## Language support

The theme supports different languages. It also works with a single language.

To support multiple languages you must add your language to `langs` array in `gatsby-config.js`. First item in the array will be your default language and also it will be shown on on `/` url.

## Menu

Menu is created automatically from your pages. You can control order of menu items and which page to show.

```
---
showInMenu: true // false to not to show 
menuOrder: 2
---
```

### Translate pages

To translate the page for both English and Russian, I've created two Markdown pages like this:

```
- content
  - pages
      - home.en.md
      = home.ru.md
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

### Post preview image

![Post preview image](https://user-images.githubusercontent.com/299118/82766167-6ee98e00-9e25-11ea-9358-3e61f9909ba0.png)

In order to add preview image for post, add `coverImg` key to markdown:

```
---
coverImg: /uploads/your-cover-image.jpg
---
```


