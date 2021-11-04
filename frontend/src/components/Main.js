import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useEffect } from 'react';

function Main(props) {

  const profile = React.useContext(CurrentUserContext);

  useEffect(() => {
    props.setHeaderState({name: 'Выйти', link: '/sign-in'});
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__editable">
          <div className="profile__avatar-cover" onClick={props.onEditAvatar}>
            <div className="profile__avatar" style={{ backgroundImage: `url(${profile.avatar})` }}></div>
            <div className="profile__avatar-button"></div>
          </div>  
          <div className="profile__info">
            <div className="profile__name-with-button">
              <h1 className="profile__title">{profile.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать"></button>
            </div>
            <p className="profile__subtitle">{profile.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить"></button>
      </section>
      <section className="elements">
        {props.isLoading ? '' : props.cards.map((card) => {
          return (
            <Card 
              key={card.id} 
              {...card} 
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike} 
              onDeleteCofirm={props.onDeleteCofirm} />
          )
        })} 
      </section>
    </main>
  )
}

export default Main;