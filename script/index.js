import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards__element').content;


const formAdd = document.querySelector('.popup__form_type_add');
const formEdit = document.querySelector('.popup__form_type_edit');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');



const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

const popups = document.querySelectorAll('.popup');

const initialCards = [
  {
    name: 'Древнее',
    link: 'https://images.unsplash.com/photo-1641228850624-92a0247e7682'
  },
  {
    name: 'Грибное',
    link: 'https://images.unsplash.com/photo-1545590976-422b6f1fe420'
  },
  {
    name: 'Дремучее',
    link: 'https://images.unsplash.com/photo-1638470747140-acef252a1921'
  },
  {
    name: 'Глубоководное',
    link: 'https://images.unsplash.com/photo-1616616839679-eec174e9d429'
  },
  {
    name: 'Красивое',
    link: 'https://images.unsplash.com/photo-1654955836276-ae14e45e6d65'
  },
  {
    name: 'Странометаморфозное',
    link: 'https://images.unsplash.com/photo-1562869929-bda0650edb1f'
  }
];

/*Открыть/закрыть попап*/
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

/*Редактировать профиль*/
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEdit);
}

/*Добавить место*/
function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const newCard = new Card(placeValue, linkValue, cardTemplate);
  const cardsElement = newCard.createCard();
  const submitButton = popupAdd.querySelector('.popup__button');
  cardsContainer.prepend(cardsElement);
  closePopup(popupAdd);
  submitButton.setAttribute('disabled', true);
  formAdd.reset();
}

/*Закрыть по Esc*/
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/*Слушатели внешних кнопок*/
buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd);
});

/*Слушатели Submit*/
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

/*Закрытие попапов*/
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-x') || evt.target.classList.contains('popup__overlay')) {
        closePopup(popup);
      }
  });
});


/*Валидация отправки формы*/
const formList = Array.from(document.querySelectorAll(selectorsList.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const checkForm = new FormValidator(selectorsList, formElement);
    checkForm.enableValidation();
  });


/*Начальные карточки*/
for (let i = 0; i < initialCards.length; i++) {
  const newCard = new Card(initialCards[i].name, initialCards[i].link, cardTemplate);
  const cardsElement = newCard.createCard();
  cardsContainer.append(cardsElement);
}