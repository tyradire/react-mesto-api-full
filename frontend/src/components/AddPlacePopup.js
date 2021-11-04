import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const namePlaceRef = useRef();
  const linkPlaceRef = useRef();

  useEffect(() => {
    namePlaceRef.current.value = '';
    linkPlaceRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onSubmitPlace(namePlaceRef.current.value, linkPlaceRef.current.value);
  }

  return (
    <PopupWithForm id={"popup-add"} title={"Новое место"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName={'Создать'}>
      <input ref={namePlaceRef} type="text" minLength="2" maxLength="30" className="popup__input popup__input_type_place" id="place" name="place" placeholder="Название" required/>
      <span className="popup__form-error" id="place-error"></span>
      <input ref={linkPlaceRef} type="url" className="popup__input popup__input_type_link" id="link" name="link" placeholder="Ссылка на картинку" required/>
      <span className="popup__form-error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;