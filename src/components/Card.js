import React from 'react';

const Card = (props) => {
    function handleClick() {
        props.onCardClick(props.card);
    }  

    return (
        <li className="element">
            <button onClick={handleClick} className="element__pic-button" type="button" aria-label="Открыть изображение"><img className="element__pic" src={props.card.link} alt={props.card.name}/></button>
            <button className="element__delete-button" type="button" aria-label="Удалить"></button>
            <div className="element__describtion">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like-place">
                    <button className="element__button" type="button" aria-label="Нравится"></button>
                    <p className="element__like-counter">{props.card.likes.lenght}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;