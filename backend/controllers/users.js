const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным id не найден');
    }
    return res.status(200).send(user);
  })
  .catch(next);

const getUser = (req, res, next) => User.findById(req.user)
  .then((user) => res.status(200).send(user))
  .catch(next);

const createUser = (req, res, next) => {
  const {
    email, name, about, avatar,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!validator.isEmail(email)) throw new UnauthorizedError('Неправильный email');
      if (user) throw new ConflictError('Неправильный email');
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => User.create({
      password: hash, email, name, about, avatar,
    }))
    .then((user) => res.status(200).send({
      email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные при создании пользователя'));
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new UnauthorizedError('Невалидные данные');
  User.findOne({ email }).select('+password')
    .then(async (user) => {
      if (!user) throw new UnauthorizedError('Неправильные почта или пароль');
      return { user, matched: await bcrypt.compare(password, user.password) };
    })
    .then(({ user, matched }) => {
      if (!matched) throw new UnauthorizedError('Неправильные почта или пароль');
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.send({ token });
    })
    .catch(next);
};

const editUserInfo = (req, res, next) => User.findByIdAndUpdate(req.user._id,
  { ...req.body },
  { new: true, runValidators: true })
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь с указанным id не найден');
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные при обновлении профиля'));
    if (err.name === 'CastError') return next(new CastError('Передан некорректный id'));
    next(err);
  });

const editUserAvatar = (req, res, next) => User.findByIdAndUpdate(req.user._id,
  { avatar: req.body.avatar },
  { new: true, runValidators: true })
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь с указанным id не найден');
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные при обновлении профиля'));
    if (err.name === 'CastError') return next(new CastError('Передан некорректный id'));
    next(err);
  });

module.exports = {
  getUser, getUsers, getUserById, createUser, editUserInfo, editUserAvatar, login,
};
