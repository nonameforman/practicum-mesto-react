import React from 'react';

const ImagePopup = (props) => {
    if (!props.card) return null;
    return (
        <div className={`popup popup_pic-fullscreen ${props.card && "popup_opened"}`} id="popup_pic-fullscreen">
            <img className="popup__image" src={props.card.link} alt={props.card.name}/>
            <button onClick={props.onClose} className="popup__button-close button-hover" id="close_pic-fullscreen" type="button" aria-label="Закрыть"></button>
            <h2 className="popup__capture">{props.card.name}</h2>
            <div onClick={props.onClose} className="popup__overlay" id="overlay_pic-fullscreen"></div>
        </div>
    );
}

export default ImagePopup;