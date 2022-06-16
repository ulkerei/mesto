const add = document.querySelector('.profile__button_type_add');
const edit = document.querySelector('.profile__button_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupView = document.querySelector('.popup_type_viewer');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards__element').content;

const close = document.querySelectorAll('.popup__close');
const formElement = document.querySelectorAll('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const viewer = document.querySelector('.popup_type_viewer');

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

/*Заполнение карточки*/
function createCard (name, link) {
  const element = cardTemplate.querySelector('.cards__element').cloneNode(true);
  element.querySelector('.cards__image').alt = name;
  element.querySelector('.cards__image').src = link;
  element.querySelector('.cards__place').textContent = name;
  return element;
}

/*Действия с карточкой*/
function actCard (target) {
  const like = target.querySelector('.cards__like');
  const del = target.querySelector('.cards__delete');
  const view = target.querySelector('.cards__image');

  like.addEventListener('click', function() {
    like.classList.toggle('cards__like_state_active');
  });

  del.addEventListener('click', function() {
    del.closest('.cards__element').remove();
  });

  view.addEventListener('click', function() {
    const link = target.querySelector('.cards__image').src;
    const place = target.querySelector('.cards__image').alt;
    viewer.querySelector('.popup__view-image').src = link;
    viewer.querySelector('.popup__view-image').alt = place;
    viewer.querySelector('.popup__view-location').textContent = place;
    viewer.classList.add('popup_opened');
  });
}

/*Начальные карточки*/
for (let i = 0; i < initialCards.length; i++) {
  cardsElement = createCard(initialCards[i].name, initialCards[i].link);
  cardsContainer.append(cardsElement);
  actCard(cardsElement);
}

/*Редактировать профиль*/
edit.addEventListener('click', function() {
  popupEdit.classList.add('popup_opened');
  const fullnameValue = document.querySelector('.popup__input_type_name');
  const jobValue = document.querySelector('.popup__input_type_job');
  fullnameValue.value = document.querySelector('.profile__name').textContent;
  jobValue.value = document.querySelector('.profile__job').textContent;

  function formSubmitHandler (evt) {
    evt.preventDefault();
    const fullname = document.querySelector('.profile__name');
    const job = document.querySelector('.profile__job');
    job.textContent = jobInput.value;
    fullname.textContent = nameInput.value;
    popupEdit.classList.remove('popup_opened');
  }

  formElement[0].addEventListener('submit', formSubmitHandler); 

  close[0].addEventListener('click', function() {
    popupEdit.classList.remove('popup_opened');
  });
});


/*Добавить место*/
add.addEventListener('click', function() {
  popupAdd.classList.add('popup_opened');

  function formSubmitHandler (evt) {
    evt.preventDefault();
    const placeValue = document.querySelector('.popup__input_type_place').value;
    const linkValue = document.querySelector('.popup__input_type_link').value;

    cardsNew = createCard(placeValue, linkValue);
    cardsContainer.prepend(cardsNew);
    actCard (cardsNew);
    popupAdd.classList.remove('popup_opened');
    formElement[1].removeEventListener('submit', formSubmitHandler); 
  }

  formElement[1].addEventListener('submit', formSubmitHandler); 

  close[1].addEventListener('click', function() {
    popupAdd.classList.remove('popup_opened');
  });
});

/*Закрыть просмотр*/
close[2].addEventListener('click', function() {
    popupView.classList.remove('popup_opened');
});
