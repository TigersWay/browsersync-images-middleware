module.exports = {
  middleware: [{
    route: '/img',
    handle: require('browsersync-images-middleware')('.')
  }],
  browser: "chrome",
  // https: {key: "/key.pem", cert: "/cert.pem"}
};
