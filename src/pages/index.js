import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
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
const popupAddSelector = '.popup_type_add';
const popupEditSelector = '.popup_type_edit';
const popupViewSelector = '.popup_type_viewer';
const cardsContainer = document.querySelector('.cards');
const cardTemplateSelector = '#cards__element';

const formAdd = document.querySelector('.popup__form_type_add');
const formEdit = document.querySelector('.popup__form_type_edit');

const profileData = {
  name: '.profile__name',
  job: '.profile__job'
}

const cardsInitial = [
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

const formAddValidator = new FormValidator(selectorsList, formAdd);
const formEditValidator = new FormValidator(selectorsList, formEdit);

/* попапы */
const popupViewItem = new PopupWithImage(popupViewSelector);

const popupAddItem = new PopupWithForm(popupAddSelector, (values) => {
  const cardNew = generateCard(values, cardTemplateSelector, () => handelView (values.name, values.link));
  cards.placeItem(cardNew, false);
});

const popupEditItem = new PopupWithForm(popupEditSelector, (values) => {
  profile.setUserInfo(values);
});

/* начальные карты */
const cards = new Section({
  items: cardsInitial,
  renderer:(item) => {
    const card = generateCard (item, cardTemplateSelector, () => handelView (item.name, item.link));
    cards.placeItem (card, true);
  }
},cardsContainer);

/*Info*/
const profile = new UserInfo(profileData);

/*Карточка*/
function generateCard (data, cardTemplateSelector){
  const cardNew = new Card(data.place, data.link, cardTemplateSelector, handelView);
  const cardsElement = cardNew.createCard();
  return cardsElement;
}

/*Валидация отправки формы*/
  formEditValidator.enableValidation();
  formAddValidator.enableValidation();

/*Просмотр картинки*/
function handelView (link, place) {
  popupViewItem.openPopup(link, place);
}

/*Рендер карточек*/
cards.renderItems ();

/*Слушатели*/
popupViewItem.setEventListeners ();
popupAddItem.setEventListeners ();
popupEditItem.setEventListeners ();

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