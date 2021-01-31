# browsersync-images-middleware  ![GitHub last commit](https://img.shields.io/github/last-commit/tigersway/browsersync-images-middleware?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/tigersway/browsersync-images-middleware?style=flat-square)

browser-sync development middleware to transform local images (fake-CDN feature)


### Install  [![npm](https://img.shields.io/npm/v/browsersync-images-middleware?style=flat-square)](https://www.npmjs.com/package/browsersync-images-middleware)

```
npm i -D browsersync-images-middleware
```

### Setup and features

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
    With these parameters/options
    - width (default `undefined`)
    - height (default `undefined`)
    - dpr (default `1`)
    - resize smart/fit (default `smart`)
    - force webp/avif (default `undefined`)
    to build these url:
    `/img/w=200,f=webp/image/somewhere/cat.jpg`
    `/img/w=300,h=300/image/anotherpath/dog.png`
    `/img/w=400,h=200,s=fit,f=webp/image/tree/bird.jpg`

### Demos

You can find a handlebars&trade; demo [here](https://github.com/TigersWay/browsersync-images-middleware/tree/main/demo) with its simpliest helper:
```js
cdn.register = (Handlebars) => {
  Handlebars.registerHelper('cdn', (imagePath, options) => {
    const o = options.hash;
    return `/img/w=${o.width}${o.height ? ',h='+o.height : ''}${imagePath}`;
  });
};
```
or a Eleventy&trade; one [there](https://github.com/TigersWay/browsersync-images-middleware/tree/main/11ty-sample) with its filter:
```js
eleventyConfig.addFilter('cdn', (imagePath, width, height) => `/img/w=${width}${height ? ',h='+height : ''}${imagePath}`);
```



### CHANGELOG

**v1.0.0**
- [ ] Add option: smartcrop disable
- [ ] Implement: WebP ? avif ?
- [ ] Samples with known CDN with image transformation ?

**v0.4.x**
- Correction: URL is now "URI decoded"
- Added png images

**v0.2.0**
- [Eleventy](https://www.11ty.dev/) sample
- Added option: DPR

**v0.1.0**
- Initial upload
