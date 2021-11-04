const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const verify = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(new UnauthorizedError('Необходима авторизация'));
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = {
  verify,
};
