import React, {useState, useEffect} from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo()
        .then((res) => {
          setCurrentUser({...res})
        })
        .catch((err) => {
            console.log(`Ошибка при получении данных профиля ${err}`)
        })
  },[]);

  useEffect(() => {
    api.getCards()
        .then(res => setCards(res))
        .catch((err) => {
            console.log(`Ошибка при получении карточек с сервера ${err}`)
        })
},[]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    !isLiked
    ? api.putLikeCard(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка при лайке карточки ${err}`)
      })
    : api.deleteLikeCard(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка при лайке карточки ${err}`)
      })
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards}/>
          <Footer />
          <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name="edit-profile" title="Редактировать профиль"> {/*редактирование профиля*/}
              <input className="popup__input" id="input_name" type="text" name="name" placeholder="Ваше имя" required minLength="2" maxLength="40"/>
              <span className="popup__error" id="input_name-error"></span>
              <input className="popup__input" id="input_about" type="text" name="about" placeholder="Расскажите о себе" required minLength="2" maxLength="200"/>
              <span className="popup__error" id="input_about-error"></span>
              <button className="popup__button" id="save-button" type="submit">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name="add-card" title="Новое место"> {/*добавить карточку*/}
              <input className="popup__input" id="input_mesto" type="text" name="name" placeholder="Название" required minLength="2" maxLength="200"/>
              <span className="popup__error" id="input_mesto-error"></span>
              <input className="popup__input" id="input_link" type="url" name="link" placeholder="Ссылка на картинку" required/>
              <span className="popup__error" id="input_link-error"></span>
              <button className="popup__button" id="create-button" type="submit">Создать</button>
          </PopupWithForm>
          <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name="edit-avatar" title="Обновить аватар"> {/*обновить аватар*/}
              <input className="popup__input" id="input_link-avatar" type="url" name="link" placeholder="Ссылка на новый аватар" required/>
              <span className="popup__error" id="input_link-avatar-error"></span>
              <button className="popup__button" id="save-avatar-button" type="submit">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm name="confirm-delition" title="Вы уверены?"> {/*подтверждение удаления*/}
              <button className="popup__button" id="delete-button" type="submit">Да</button>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  ); 
}

export default App;