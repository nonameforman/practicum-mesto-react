import React, {useState, useEffect} from 'react';
import api from '../utils/api.js'
import Card from './Card.js'

const Main = (props) => {
    const [userName, setUserName] = useState("...");
    const [userDescription, setUserDescription] = useState("...");
    const [userAvatar, setUserAvatar] = useState();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setUserAvatar(res.avatar)
                setUserDescription(res.about)
                setUserName(res.name)})
        api.getCards()
            .then(res => setCards(res))
    },[]);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <button onClick={props.onEditAvatar} className="profile__edit-image" type="button" aria-label="Изменить аватар">
                        <img className="profile__avatar" src={userAvatar} alt="Аватар."/>
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} className="profile__edit-button button-hover" type="button" aria-label="Редактировать"></button>
                        <h2 className="profile__about">{userDescription}</h2>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button button-hover" type="button"></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map(card => <Card card={card} onCardClick={props.onCardClick} key={card._id}/>)}
                </ul>
            </section>
        </main>
    );
}

export default Main;