import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import './pages/index.css';

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
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupView = document.querySelector('.popup_type_viewer');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards__element').content;

const formAdd = document.querySelector('.popup__form_type_add');
const formEdit = document.querySelector('.popup__form_type_edit');

const profileData = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
}

const initialCards = [
  {
    place: 'Древнее',
    link: 'https://images.unsplash.com/photo-1641228850624-92a0247e7682'
  },
  {
    place: 'Грибное',
    link: 'https://images.unsplash.com/photo-1545590976-422b6f1fe420'
  },
  {
    place: 'Дремучее',
    link: 'https://images.unsplash.com/photo-1638470747140-acef252a1921'
  },
  {
    place: 'Глубоководное',
    link: 'https://images.unsplash.com/photo-1616616839679-eec174e9d429'
  },
  {
    place: 'Красивое',
    link: 'https://images.unsplash.com/photo-1654955836276-ae14e45e6d65'
  },
  {
    place: 'Странометаморфозное',
    link: 'https://images.unsplash.com/photo-1562869929-bda0650edb1f'
  }
];

const addFormValidator = new FormValidator(selectorsList, formAdd);
const editFormValidator = new FormValidator(selectorsList, formEdit);

/* попапы */
const viewPopupItem = new PopupWithImage(popupView);

const addPopupItem = new PopupWithForm(popupAdd, (values) => {
  const newCard = generateCard(values, cardTemplate, () => handelView (values.name, values.link));
  cards.placeItem(newCard, false);
});

const editPopupItem = new PopupWithForm(popupEdit, (values) => {
  profile.setUserInfo(values);
});

/* начальные карты */
const cards = new Section({
  items: initialCards,
  renderer:(item) => {
    const card = generateCard (item, cardTemplate, () => handelView (item.name, item.link));
    cards.placeItem (card, true);
  }
},cardsContainer);

/*Info*/
const profile = new UserInfo(profileData);

/*Карточка*/
function generateCard (data, cardTemplate){
  const newCard = new Card(data.place, data.link, cardTemplate, handelView);
  const cardsElement = newCard.createCard();
  return cardsElement;
}

/*Валидация отправки формы*/
  editFormValidator.enableValidation();
  addFormValidator.enableValidation();

/*Просмотр картинки*/
function handelView (link, place) {
  viewPopupItem.openPopup(link, place);
}

/*Рендер карточек*/
cards.renderItems ();

/*Слушатели*/
viewPopupItem.setEventListeners ();
addPopupItem.setEventListeners ();
editPopupItem.setEventListeners ();

buttonEdit.addEventListener('click', function() {
  profile.setUserInfo(profile.getUserInfo());
  editFormValidator.resetValidation();
  editPopupItem.openPopup();
});

buttonAdd.addEventListener('click', function() {
  addFormValidator.resetValidation();
  addPopupItem.openPopup();
});