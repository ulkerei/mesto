/*Карточки*/
export default class Card {
  constructor(data, templateSelector, handelView, openDeletePopup, handelLike) {
    this._place = data.place || data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._owner = data.owner;
    this._self = 'c1e8bf3d88660c8a2b4bf8a0';
    this._selector = templateSelector;
    this._template = document.querySelector(templateSelector).content;
    this._element = this._template.querySelector('.cards__element').cloneNode(true);
    this._like = this._element.querySelector('.cards__like');
    this._counter = this._element.querySelector('.cards__likes-counter');
    this._del = this._element.querySelector('.cards__delete');
    this._view = this._element.querySelector('.cards__image');
    this._handelView = handelView;
    this._openDeletePopup = openDeletePopup;
    this._handelLike = handelLike;
  }

  likeCard() {
    this._like.classList.toggle('cards__like_state_active');
  }

  updateCounter (amount) {
    this._counter.textContent = amount;
  }

  _setEventListeners() {
    this._view.addEventListener('click', () => this._handelView(this._place, this._link));
    this._like.addEventListener('click', () => this._handelLike(this._id,this._element));
    this._del.addEventListener('click', () => this._openDeletePopup(this._element));
  }

  createCard () {
    this._view.src = this._link;
    this._view.alt = this._place;
    this._element.querySelector('.cards__place').textContent = this._place;
    this._counter.textContent = this._likes.length;
    if (this._owner._id !== this._self) {
      this._del.classList.add('cards__delete_hidden');
    }
    if (this._likes.some((like) => like._id === this._self)) {
      this._like.classList.add('cards__like_state_active');
    }
    this._setEventListeners();
    return this._element;
  }
}
