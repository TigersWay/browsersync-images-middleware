module.exports = (eleventyConfig) => {

  // This filter is set for the local fake-CDN,
  // each real CDN will need its own!
  eleventyConfig.addFilter('cdn', (imagePath, width, height) => `/img/w=${width}${height ? ',h='+height : ''}${imagePath}`);

  eleventyConfig.setBrowserSyncConfig({
    open: true,
    middleware: [{
      route: '/img',
      handle: require('browsersync-images-middleware')('public')
    }]
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
