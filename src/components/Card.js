/*Карточки*/
export default class Card {
  constructor(data, userId, templateSelector, handelView, openDeletePopup, handelLike) {
    this._place = data.place || data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this.id = data._id;
    this._owner = data.owner;
    this._self = userId;
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

  updateCounter (likes) {
    this._counter.textContent = likes;
  }

  isLiked() {
    return this._like.classList.contains('cards__like_state_active');
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._view.addEventListener('click', () => this._handelView(this._place, this._link));
    this._like.addEventListener('click', () => this._handelLike(this));
    this._del.addEventListener('click', () => this._openDeletePopup(this));
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
