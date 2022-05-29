let add = document.querySelector('.profile__button_type_add');
add.addEventListener('click', function() {
console.log('+'); //заглушка для будущих событий)
});

let like = document.querySelectorAll('.elements__like');
for (let i = 0; i < like.length; i++) {
like[i].addEventListener('click', function() {
  like[i].classList.toggle('elements__like_active');
  console.log('♥'); //для будущих событий)
});
}

let popup = document.querySelector('.popup');

let edit = document.querySelector('.profile__button_type_edit');
edit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  let fullnameValue = document.querySelector('.popup__input_type_name');
  let jobValue = document.querySelector('.popup__input_type_job');
  fullnameValue.value = document.querySelector('.profile__name').textContent;
  jobValue.value = document.querySelector('.profile__job').textContent;
});

let close = document.querySelector('.popup__close');
close.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

function formSubmitHandler (evt) {
  evt.preventDefault();
  let fullname = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__job');
  job.textContent = jobInput.value;
  fullname.textContent = nameInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 