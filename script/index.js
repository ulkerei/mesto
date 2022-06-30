const buttonAdd = document.querySelector('.profile__button_type_add');
const buttonEdit = document.querySelector('.profile__button_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupView = document.querySelector('.popup_type_viewer');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards__element').content;

const closeButtons = document.querySelectorAll('.popup__close');

const formAdd = document.querySelector('.popup__form_type_add');
const formEdit = document.querySelector('.popup__form_type_edit');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


const viewer = document.querySelector('.popup_type_viewer');
const viewImage = viewer.querySelector('.popup__view-image');
const viewLocation = viewer.querySelector('.popup__view-location');

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
function openPopup(popup) {
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
  const cardsNew = createCard(placeValue, linkValue);
  const submitButton = popupAdd.querySelector('.popup__button');
  cardsContainer.prepend(cardsNew);
  closePopup(popupAdd);
  submitButton.setAttribute('disabled', true);
  formAdd.reset();
}

/*Карточки*/
function createCard (name, link) {
  const element = cardTemplate.querySelector('.cards__element').cloneNode(true);
  const like = element.querySelector('.cards__like');
  const del = element.querySelector('.cards__delete');
  const view = element.querySelector('.cards__image');

  view.alt = name;
  view.src = link;
  element.querySelector('.cards__place').textContent = name;

  like.addEventListener('click', function() {
    like.classList.toggle('cards__like_state_active');
  });

  del.addEventListener('click', function() {
    del.closest('.cards__element').remove();
  });

  view.addEventListener('click', function() {
    viewImage.src = link;
    viewImage.alt = name;
    viewLocation.textContent = name;
    openPopup(viewer);
  });
  return element;
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

/*Начальные карточки*/
for (let i = 0; i < initialCards.length; i++) {
  const cardsElement = createCard(initialCards[i].name, initialCards[i].link);
  cardsContainer.append(cardsElement);
}