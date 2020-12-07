
const
  colors = require('ansi-colors'),
  sharp = require('sharp'),

  fs = require('fs');


let imageRoot;

module.exports = (root) => {

  // Is defined root available?
  if (!fs.existsSync(root)) {
    throw new Error(`images-middleware: can't find root folder: '${root}'`);
  }
  imageRoot = root;

  return (request, response, next) => {
    let match = decodeURI(request.url).match(/^\/(?<rules>[^/]*)\/(?<image>.*?.(?<ext>jpg|jpeg|png))$/);
    if (match) {

      // Collect rules
      let rules = {};
      match.groups.rules.split(',').forEach(rule => {
        const [key, value] = rule.split('=');
        rules[key] = value;
      });

      // Is image avavilable?
      if (!fs.existsSync(`${imageRoot}/${match.groups.image}`)) {
        console.error(colors.red(`images-middleware >> ${match.groups.image} does not exist!`));
        return;
      }

      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

      // SmartCrop
      let options = {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      };

      options.dpr = rules.dpr ? parseInt(rules.dpr) : 1;
      options.width = rules.w ? parseInt(rules.w) * options.dpr : null;
      options.height = rules.h ? parseInt(rules.h) * options.dpr  : null;

      let transformer = sharp()
        .resize(options)
        .on('info', info => {
          response.setHeader('Content-Type', `image/${info.format}`);
          response.setHeader('Content-Length', info.size);
        });

      fs.createReadStream(`${imageRoot}/${match.groups.image}`)
        .on('error', (e) => {
          console.error(colors.red(e.message));
          next();
        })
        .pipe(transformer)
        .pipe(response);

    } else next();
  };

};
