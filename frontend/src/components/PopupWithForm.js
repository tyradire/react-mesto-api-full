function PopupWithForm(props) {
  
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id={props.id} >
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__button">{props.buttonName}</button>
        </form> 
      </div>
    </div>
  )
}

export default PopupWithForm;