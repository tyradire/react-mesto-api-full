const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = (req, res, next) => Card.create({ owner: req.user._id, ...req.body })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные при создании карточки'));
    next(err);
  });

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка с указанным id не найдена');
    if (card.owner.toString() !== req.user._id) throw new ForbiddenError('Недостаточно прав для удаления');
    return Card.findByIdAndRemove(req.params.cardId);
  })
  .then((card) => res.status(200).send(card))
  .catch(next);

const putLikeCard = (req, res, next) => Card.findByIdAndUpdate(req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка с указанным id не найдена');
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные для постановки/снятии лайка'));
    next(err);
  });

const deleteLikeCard = (req, res, next) => Card.findByIdAndUpdate(req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка с указанным id не найдена');
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные для постановки/снятии лайка'));
    next(err);
  });

module.exports = {
  createCard, getCards, deleteCard, putLikeCard, deleteLikeCard,
};
