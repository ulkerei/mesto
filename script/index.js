let add = document.querySelector('.profile__button_type_add');
let like = document.querySelectorAll('.cards__like');
let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__button_type_edit');
let close = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

add.addEventListener('click', function() {
});

for (let i = 0; i < like.length; i++) {
like[i].addEventListener('click', function() {
  like[i].classList.toggle('cards__like_state_active');
});
}

edit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  let fullnameValue = document.querySelector('.popup__input_type_name');
  let jobValue = document.querySelector('.popup__input_type_job');
  fullnameValue.value = document.querySelector('.profile__name').textContent;
  jobValue.value = document.querySelector('.profile__job').textContent;
});

close.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  let fullname = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__job');
  job.textContent = jobInput.value;
  fullname.textContent = nameInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 