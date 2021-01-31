var cdn = () => {};

cdn.register = (Handlebars) => {
  Handlebars.registerHelper('cdn', (imagePath, options) => {
    const o = options.hash;
    return `/img/`
      + `w=${o.width}`
      + `${o.height ? ',h='+o.height : ''}`
      + `${o.force ? ',f='+o.force : ''}`
      + `${imagePath}`;
  });
};

module.exports = cdn;
