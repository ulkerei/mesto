import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup,handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues () {
    const values = {};
    this._inputs.forEach((element) => {
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

  showLoading (loading) {
    if (loading) {
      this._button.textContent = 'Сохранение...';
    } else {
    this._button.textContent = 'Сохранить';
    }
  }
}