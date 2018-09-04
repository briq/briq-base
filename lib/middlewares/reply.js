const debug = require('debug')('briq:reply')

const replyMiddleware = (req, res, next) => {
  if (!res.Briq) res.Briq = {};

  res.Briq.replyWithMessage = (message, options) => {
    const safeOptions = {
      status: 200,
      fragment: '',
      redirectTo: 'back',
      ...options
    };

    debug(options);

    return res.format({
      html() {
        req.flash('info', message);
        res.redirect(safeOptions.redirectTo);
      },
      json() {
        res.render(safeOptions.fragment, (err, html) => {
          if (err) {
            return next(err);
          }

          debug(html);
  
          res.status(safeOptions.status).json({
            message,
            replace: html
          });
        });
      }
    });
  };

  next();

  return res.Briq;
};

module.exports = replyMiddleware;
