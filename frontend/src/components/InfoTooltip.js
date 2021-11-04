function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} >
      <div className="popup__container">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose}></button>
        <div className="popup__notification">
          <img className="popup__icon" src={props.icon} alt="Иконка"></img>
          <h2 className="popup__title">{props.description}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;