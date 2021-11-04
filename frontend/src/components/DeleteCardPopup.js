import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onClick();
  } 


  return(
    <PopupWithForm id={"popup-confirm"} title={"Вы уверены?"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName={'Да'} >
    </PopupWithForm>
  );

}

export default DeleteCardPopup;