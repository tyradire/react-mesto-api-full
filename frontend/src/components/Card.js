import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({link, name, likes, likesAmount, id, owner, onCardClick, onCardLike, onDeleteCofirm}) { 

  const profile = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick({link: link, name: name});
  }  

  function handleLikeClick() {
    onCardLike(likes, id);
  }

  function handleDeleteClick() {
    onDeleteCofirm(id);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner === profile._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__delete' : 'element__delete element__delete_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i === profile._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__like element__like_active' : 'element__like'}`
  );

  return (
    <article className="element">
      <img className="element__image" alt={name} id="image" src={link} onClick={handleClick}/>
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить" onClick={handleDeleteClick}></button>
      <div className="element__place">
        <h2 className="element__paragraph">{name}</h2>
        <div>
          <button type="button" className={cardLikeButtonClassName} aria-label="Класс" onClick={handleLikeClick}></button>
          <p className="element__like-amount">{likesAmount}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;