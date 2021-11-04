import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function nameChange(e) {
    setName(e.target.value);
  }

  function descriptionChange(e) {
    setDescription(e.target.value);
  }

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
      <PopupWithForm id={"popup-edit"} title={"Редактировать профиль"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName={'Сохранить'}> 
          <input type="text" minLength="2" maxLength="40" className="popup__input popup__input_type_name" value={name} onChange={nameChange} id="name" name='name' placeholder="Имя" required/>
          <span className="popup__form-error" id="name-error"></span>
          <input type="text" minLength="2" maxLength="200" className="popup__input popup__input_type_description" value={description} onChange={descriptionChange} id="description" name='description' placeholder="Профессиональная деятельность" required/>
          <span className="popup__form-error" id="description-error"></span>
      </PopupWithForm>
  )
}

export default EditProfilePopup;