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

You can find demos [here](https://github.com/TigersWay/browsersync-images-middleware/tree/main/demo) or [there](https://github.com/TigersWay/browsersync-images-middleware/tree/main/11ty-sample).

### CHANGELOG

**WIP**
- [ ] Add option: smartcrop disable
- [ ] Implement: WebP

**v0.4.0**
- Correction: URL is now "URI decoded"
- Added png images

**v0.2.0**
- [Eleventy](https://www.11ty.dev/) sample
- Added option: DPR

**v0.1.0**
- Initial upload
