
const
  colors = require('ansi-colors'),
  sharp = require('sharp'),

  fs = require('fs');


let imageRoot;

module.exports = (root) => {

  if (!fs.existsSync(root)) {
    throw new Error(`images-middleware: can't find root folder: '${root}'`);
  }

  imageRoot = root;

  return (request, response, next) => {
    let match = request.url.match(/^\/(?<rules>[^/]*)\/(?<image>.*?.(?<ext>jpg|jpeg|png))$/);
    if (match) {
      let rules = {};
      match.groups.rules.split(',').forEach(rule => {
        const [key, value] = rule.split('=');
        rules[key] = value;
      });

      if (!fs.existsSync(`${imageRoot}/${match.groups.image}`)) {
        console.error(colors.red(`images-middleware >> ${match.groups.image} does not exist!`));
        return;
      }

      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

      let options = {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      };
      options.width = rules.w ? parseInt(rules.w) : null;
      options.height = rules.h ? parseInt(rules.h) : null;

      let transformer = sharp()
        .resize(options)
        .on('info', info => {
          // response.setHeader('Accept-Ranges', 'bytes');
          response.setHeader('Content-Length', info.size);
        });

      response.setHeader('Content-Type', 'image/jpeg');

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
