import React, {useEffect} from 'react';

const PopupWithForm = ({isOpen, onClose, name, title, children}) => {
    if(isOpen) {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape") {
                onClose();
            }
        });
    }

    return (
        <div className={`popup ${isOpen && "popup_opened"}`} id={`popup_${name}`}>
            <div className="popup__container">
                <h2 className="popup__title">
                    {title}
                </h2>
                <form className="popup__form" id={`popup__form_${name}`} name={name}>
                    {children}
                </form>
            </div>
            <button onClick={onClose} className="popup__button-close button-hover" type="button" aria-label="Закрыть"></button>
            <div onClick={onClose} className="popup__overlay"></div>
        </div>
    );
}

export default PopupWithForm;
