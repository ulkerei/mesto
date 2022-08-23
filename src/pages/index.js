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
  renderer:(item) => {
    let card = generateCard (item, cardTemplateSelector, () => handelView (item.name, item.link),() => openConfirm(item, card),() => handelLike(item, card));
    cards.placeItem (card, true);
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
      let cardNew = generateCard(info, cardTemplateSelector, () => handelView (info.place, info.link), () => openConfirm(info, cardNew), () => handelLike(info, cardNew));
      cards.placeItem(cardNew, false);
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
    profile.setUserInfo(userInfo);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => popupEditItem.showLoading(false));
});

const popupAvatarItem = new PopupWithForm(popupAvatarSelector, (values) => {
  popupAvatarItem.showLoading(true);
  api.setAvatar(values)
  .then((userInfo) => {
    profile.setAvatar(userInfo);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => popupAvatarItem.showLoading(false));
});

/*Info*/
const profile = new UserInfo(profileData);

/*ФУНКЦИИ*/
/*Уверены?*/
function openConfirm (item, card) {
  popupConfirmationItem.openPopup();
  popupConfirmationItem.setSubmit(() => {
    api.deleteOwnersCard(item._id)
      .then(() => {
        card.remove();
        card = null;
        popupConfirmationItem.closePopup();
      })          
      .catch((err) => {
        console.log(err);
      });
  })
}

/*likes*/
function handelLike (item, card) {
  if (card.querySelector('.cards__like').classList.contains('cards__like_state_active')) {
    api.unlike(item._id)
    .then((item) => {
      card.cardItem.updateCounter(item.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.like(item._id)
      .then((item) => {
        card.cardItem.updateCounter(item.likes.length);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  card.querySelector('.cards__like').classList.toggle('cards__like_state_active');
}

/*Карточка*/
function generateCard (data, cardTemplateSelector, handelView, openConfirm, handelLike){
  const cardNew = new Card(data, cardTemplateSelector, handelView, openConfirm, handelLike);
  const cardsElement = cardNew.createCard();
  cardsElement.cardItem = cardNew;
  return cardsElement;
}

/*Просмотр картинки*/
function handelView (link, place) {
  popupViewItem.openPopup(link, place);
}

/*ДЕЙСТВИЯ*/
/*Начальная информация*/
api.getProfileInfo()
  .then((userInfo) => {
    profile.setUserInfo(userInfo);
    profile.setAvatar(userInfo);
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((cardsInfo) => {
    cards.renderItems (cardsInfo);
  })
  .catch((err) => {
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
  const profileName = document.querySelector('.popup__input_type_name');
  const profileJob = document.querySelector('.popup__input_type_job');
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