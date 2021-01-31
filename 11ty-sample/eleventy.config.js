module.exports = (eleventyConfig) => {

  // This filter is set for the local fake-CDN,
  // each real CDN will need its own!
  eleventyConfig.addFilter('cdn', (imagePath, width, height, force) => `/img/w=${width}${height ? ',h='+height : ''}${force ? ',f='+force : ''}${imagePath}`);

  eleventyConfig.setBrowserSyncConfig({
    open: true,
    middleware: [{
      route: '/img',
      handle: require('browsersync-images-middleware')('public')
    }],
    // https: {key: "/key.pem", cert: "/cert.pem"}
  });

  eleventyConfig.addPassthroughCopy('site/images');
  eleventyConfig.addPassthroughCopy('site/favicon.ico');

  return {
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',

    dir: {
      input: 'site',
      output: 'public'
    }
  };
};
