function ImagePopup(props) {

  return (
    <div className={`popup ${props.isOpen ? " popup_opened" : "" } popup_background_dark`} id="popup-image">
      <div className="popup__cover">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose}></button>
        <img className="popup__image" alt=" " src={props.isOpen ? props.isOpen.link : ""}/>
      <h3 className="popup__description">{props.isOpen ? props.isOpen.name : ""}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;