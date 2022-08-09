import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup,handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues () {
    const values = {};
    const inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    inputs.forEach((element) => {
      values[element.name] = element.value;
    });
    return values;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
      this.closePopup();
    });
  }

  closePopup () {
    super.closePopup ();
    this._form.reset ();
  }
}