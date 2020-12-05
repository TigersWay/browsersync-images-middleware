# browsersync-images-middleware  ![GitHub last commit](https://img.shields.io/github/last-commit/tigersway/browsersync-images-middleware?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/tigersway/browsersync-images-middleware?style=flat-square)

browser-sync development middleware to transform local images (fake-CDN feature)


### Install  [![npm](https://img.shields.io/npm/v/browsersync-images-middleware?style=flat-square)](https://www.npmjs.com/package/browsersync-images-middleware)

```
npm i -D browsersync-images-middleware
```

### Setup and usage

Wherever you use browser-sync, add the middleware option, like this:
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

**WIP**
- [ ] Add option: smartcrop disable
- [ ] Implement: WebP ?
- [ ] Samples with known CDN with image transformation ?

**v0.4.2**
- Correction: URL is now "URI decoded"
- Added png images

**v0.2.0**
- [Eleventy](https://www.11ty.dev/) sample
- Added option: DPR

**v0.1.0**
- Initial upload
