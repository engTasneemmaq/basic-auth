'use strict';
function basicAuth(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Basic') {
    next();
  }
  else {
    next('Invalid Login');
  }
}
module.exports = basicAuth;
