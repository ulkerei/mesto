import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup,handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  openPopup(element) {
    this._element = element;
    super.openPopup();
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.closePopup();
    });
  }

  setSubmit(action) {
    this._handleSubmit = action;
}
}