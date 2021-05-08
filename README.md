# browsersync-images-middleware  ![GitHub last commit](https://img.shields.io/github/last-commit/tigersway/browsersync-images-middleware?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/tigersway/browsersync-images-middleware?style=flat-square)

browser-sync development middleware to resize and transform local images (fake-CDN features)


## Install  [![npm](https://img.shields.io/npm/v/browsersync-images-middleware?style=flat-square)](https://www.npmjs.com/package/browsersync-images-middleware)

```
npm i -D browsersync-images-middleware sharp
```

## Setup and features

1. Wherever you use browser-sync, add the middleware option, like this:
    ```
        ...
        middleware: [{
          route: '/img',
          handle: require('browsersync-images-middleware')('public')
        }],
        ...
    ```
    - `[img]` Your chosen route. Can be anything, as long as you set your filter the same way.
    - `[public]` The root path of your images, probably your published/destination folder.

2. and provide for your templates, a simple function, helper, filter, etc to mimic your favorite CDN's important features.
  With these parameters/options:
    - width                                 w=200
    - height                                h=300
    - dpr (default `1`)                     d=3
    - resize smart/fit (default `smart`)    s=fit
    - force webp/avif/auto                  f=auto

    to build these (random) url:
    - `/img/w=200,f=webp/image/somewhere/cat.jpg`
    - `/img/w=300,h=300/image/anotherpath/dog.png`
    - `/img/w=400,h=200,s=fit,f=auto/image/tree/bird.jpg`

## Demos

You can clone/download the github repository where you will find some demos.

A handlebars&trade; demo [here](https://github.com/TigersWay/browsersync-images-middleware/tree/main/demo) with its simpliest helper:
```js
Handlebars.registerHelper('cdn', (imagePath, options) => {
  const o = options.hash;
  return `/img/`
    + `w=${o.width}`
    + `${o.height ? ',h='+o.height : ''}`
    + `${o.force ? ',f='+o.force : ''}`
    + `${imagePath}`;
});
```

Or a Eleventy&trade; one [there](https://github.com/TigersWay/browsersync-images-middleware/tree/main/11ty-sample) with a basic filter:
```js
eleventyConfig.addFilter('cdn', (imagePath, width, height, force) => {
  return `/img/`
    + `w=${width}`
    + `${height ? ',h='+height : ''}`
    + `${force ? ',f='+force : ''}`
    + `${imagePath}`;
});
```

## CHANGELOG

**v2.0.0**
- BREAKING: sharp is now a peerDependency, you must install it seperately

**v1.0.0**
- Automatic smartcrop can now be changed to fit
- WebP, AVIF and auto mode (Thanks to [sharp](https://github.com/lovell/sharp))

**v0.4.x**
- Correction: URL is now "URI decoded"
- Added png images

**v0.2.0**
- [Eleventy](https://www.11ty.dev/) sample
- Added option: DPR

**v0.1.0**
- Initial upload
