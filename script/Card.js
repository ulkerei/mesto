import {openPopup} from './index.js';

const viewer = document.querySelector('.popup_type_viewer');
const viewImage = viewer.querySelector('.popup__view-image');
const viewLocation = viewer.querySelector('.popup__view-location');

/*Карточки*/
export default class Card {
  constructor(place, link, template) {
    this._place = place;
    this._link = link;
    this._element = template.querySelector('.cards__element').cloneNode(true);
    this._like = this._element.querySelector('.cards__like');
    this._del = this._element.querySelector('.cards__delete');
    this._view = this._element.querySelector('.cards__image');
  }

  _likeCard() {
    this._like.classList.toggle('cards__like_state_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _viewCard() {
    viewImage.src = this._link;
    viewImage.alt = this._place;
    viewLocation.textContent = this._place;
    openPopup(viewer);
  }

  _setEventListeners() {
    this._view.addEventListener('click', () => this._viewCard(this._place, this._link));
    this._like.addEventListener('click', () => this._likeCard());
    this._del.addEventListener('click', () => this._deleteCard());
  }

  createCard () {
    this._view.src = this._link;
    this._view.alt = this._place;
    this._element.querySelector('.cards__place').textContent = this._place;
    this._setEventListeners();
    return this._element;
  }
}