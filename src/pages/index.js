import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

const selectorsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active',
  errorTypeTemplate: '.popup__input-error_type_'
}

const profileName = document.querySelector('.popup__input_type_name');
const profileJob = document.querySelector('.popup__input_type_job');
const buttonAdd = document.querySelector('.profile__button_type_add');
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAvatar = document.querySelector('.profile__button_type_edit-avatar');
const popupAddSelector = '.popup_type_add';
const popupEditSelector = '.popup_type_edit';
const popupAvatarSelector = '.popup_type_avatar';
const popupViewSelector = '.popup_type_viewer';
const popupConfirmationSelector = '.popup_type_confirm';
const cardsContainer = '.cards';
const cardTemplateSelector = '#cards__element';


const formAdd = document.querySelector('.popup__form_type_add');
const formEdit = document.querySelector('.popup__form_type_edit');
const formAvatar = document.querySelector('.popup__form_type_avatar');

const profileData = {
  name: '.profile__name',
  job: '.profile__job',
  avatar: '.profile__avatar'
}

/*ЭКЗЕМПЛЯРЫ КЛАССОВ*/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '8363e0f5-2c67-4395-bf21-4f6fde47b262',
    'Content-Type': 'application/json'
  }
});

const cards = new Section({
  renderer:(info) => {
    cards.placeItem(generateCard(info), true);
  }
},cardsContainer);

const formAddValidator = new FormValidator(selectorsList, formAdd);
const formEditValidator = new FormValidator(selectorsList, formEdit);
const formAvatarValidator = new FormValidator(selectorsList, formAvatar);

/* попапы */
const popupViewItem = new PopupWithImage(popupViewSelector);
const popupConfirmationItem = new PopupWithConfirmation(popupConfirmationSelector);

const popupAddItem = new PopupWithForm(popupAddSelector, (values) => {
  popupAddItem.showLoading(true);
  api.postNewCard(values)
    .then((info) => {
      cards.placeItem(generateCard(info), false);
      popupAddItem.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAddItem.showLoading(false));
});

const popupEditItem = new PopupWithForm(popupEditSelector, (values) => {
  popupEditItem.showLoading(true);
  api.setUserInfo(values)
  .then((userInfo) => {
    popupEditItem.closePopup();
    profile.setUserInfo(userInfo);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => popupEditItem.showLoading(false));
});

const popupAvatarItem = new PopupWithForm(popupAvatarSelector, (values) => {
  popupAvatarItem.showLoading(true);
  api.setUserInfo(values)
  .then((userInfo) => {
    popupAvatarItem.closePopup();
    profile.setUserInfo(userInfo);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => popupAvatarItem.showLoading(false));
});

/*Info*/
const profile = new UserInfo(profileData);

/*ФУНКЦИИ*/
/*Делаем карточку*/
function generateCard(item) {
  const cardCreated = new Card (item, profile.id, cardTemplateSelector, () => handelView (item.name, item.link), openConfirm, handelLike);
  return cardCreated.createCard();
}

/*Уверены?*/
function openConfirm (card) {
  popupConfirmationItem.openPopup();
  popupConfirmationItem.setSubmit(() => {
    api.deleteOwnersCard(card.id)
      .then(() => {
        card.removeCard();
        popupConfirmationItem.closePopup();
      })          
      .catch((err) => {
        console.log(err);
      });
  })
}

/*Like*/
function handelLike (card) {
  if (card.isLiked()) {
    api.unlike(card.id)
    .then((item) => {
      card.updateCounter(item.likes.length);
      card.likeCard();
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.like(card.id)
    .then((item) => {
      card.updateCounter(item.likes.length);
      card.likeCard();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

/*Просмотр картинки*/
function handelView (link, place) {
  popupViewItem.openPopup(link, place);
}

/*ДЕЙСТВИЯ*/
/*Начальная информация*/

Promise.all([
api.getProfileInfo(),
api.getInitialCards()]) 
.then(([userInfo, cardsInfo])=>{
  profile.setUserInfo(userInfo);
  cards.renderItems (cardsInfo);
}) 
.catch((err)=>{
  console.log(err);
});

/*Валидация отправки формы*/
formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();

/*Слушатели*/
popupViewItem.setEventListeners ();
popupAddItem.setEventListeners ();
popupEditItem.setEventListeners ();
popupAvatarItem.setEventListeners ();
popupConfirmationItem.setEventListeners ();

buttonEdit.addEventListener('click', function() {
  const info = profile.getUserInfo();
  profile.setUserInfo(info);
  profileName.value = info.name;
  profileJob.value = info.job;
  formEditValidator.resetValidation();
  popupEditItem.openPopup();
});

buttonAdd.addEventListener('click', function() {
  formAddValidator.resetValidation();
  popupAddItem.openPopup();
});

buttonAvatar.addEventListener('click', function() {
  formAvatarValidator.resetValidation();
  popupAvatarItem.openPopup();
});