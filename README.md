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

### ToDos
- [ ] Add option: smartcrop disable
- [ ] Implement: DPR
- [ ] Implement: WebP
