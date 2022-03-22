import React from 'react';

const Card = ({card, onCardClick}) => {
    function handleClick() {
        onCardClick(card);
    }  

    return (
        <li className="element">
            <button onClick={handleClick} className="element__pic-button" type="button" aria-label="Открыть изображение"><img className="element__pic" src={card.link} alt={card.name}/></button>
            <button className="element__delete-button" type="button" aria-label="Удалить"></button>
            <div className="element__describtion">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-place">
                    <button className="element__button" type="button" aria-label="Нравится"></button>
                    <p className="element__like-counter">{card.likes.lenght}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;