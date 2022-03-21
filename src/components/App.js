import React, {useState} from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import PopupWithForm from './PopupWithForm.js';
import Imagepopup from './ImagePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
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
        <Imagepopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  ); 
}

export default App;