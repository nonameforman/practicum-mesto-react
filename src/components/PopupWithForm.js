import React from 'react';

const PopupWithForm = (props) => {
    if(props.isOpen) {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape") {
                props.onClose();
            }
        });
    }
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`} id={`popup_${props.name}`}>
            <div className="popup__container">
                <h2 className="popup__title">
                    {props.title}
                </h2>
                <form className="popup__form" id={`popup__form_${props.name}`} name={props.name}>
                    {props.children}
                </form>
            </div>
            <button onClick={props.onClose} className="popup__button-close button-hover" type="button" aria-label="Закрыть"></button>
            <div onClick={props.onClose} className="popup__overlay"></div>
        </div>
    );
}

export default PopupWithForm;
