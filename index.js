
const
  {blue, red} = require('chalk'),
  sharp = require('sharp'),
  accepts = require('accepts'),

  fs = require('fs');


let imageRoot;

module.exports = (root) => {

  // Is root folder available?
  if (!fs.existsSync(root)) {
    console.error(`[${blue('images')}]`, red(`Cannot find root folder: ${root}`));
    throw new Error('Cannot find root folder');
  }
  imageRoot = root;


  return (request, response, next) => {

    let match = decodeURI(request.url).match(/^\/(?<rules>[^/]*)\/(?<image>.*?.(?<ext>jpe?g|png))$/);
    if (match) {

      // Is image available?
      if (!fs.existsSync(`${imageRoot}/${match.groups.image}`)) {
        console.error(`[${blue('images')}]`, red(`${match.groups.image} does not exist in ${imageRoot}`));
        return;
      }

      // Collect rules: key=value[,key=value]...
      let rules = {};
      match.groups.rules.split(',').forEach(rule => {
        const [key, value] = rule.split('=');
        rules[key] = value;
      });

      // ... and 'interpret' them.
      let options = {};

      // Width, Height & DPR
      options.dpr = rules.dpr ? parseInt(rules.dpr) : 1;
      options.width = rules.w ? parseInt(rules.w) * options.dpr : null;
      options.height = rules.h ? parseInt(rules.h) * options.dpr  : null;

      // Fit or Smartcrop (default)
      if ((options.width * options.height > 0) && (rules.s === 'fit')) {
        options.fit = sharp.fit.inside;
      } else {
        options.fit = sharp.fit.cover;
        options.position = sharp.strategy.entropy;
      }

      let transformer = sharp()
        .resize(options);

      // Better or forced type: avif, webp or stays jpg/png
      if (rules.f === 'auto') {
        switch (accepts(request).type(['avif', 'webp'])) {
          case 'avif':
            transformer = transformer.avif();
            break;
          case 'webp':
            transformer = transformer.webp();
            break;
        }
      }
      else if (rules.f === 'avif') transformer = transformer.avif();
      else if (rules.f === 'webp') transformer = transformer.webp();

      transformer = transformer
        .on('info', info => {
          response.setHeader('Content-Type', `image/${info.format}`);
          response.setHeader('Content-Length', info.size);
          response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        });

      fs.createReadStream(`${imageRoot}/${match.groups.image}`)
        .on('error', (e) => {
          console.error(`[${blue('images')}]`, red(e.message));
        })
        .pipe(transformer)
        .pipe(response);

    } else next();
  };

};
