export default class FormValidator {
  constructor(settings, element) {
    this._formSelector = settings.formSelector,
    this._inputSelector = settings.inputSelector,
    this._submitButtonSelector = settings.submitButtonSelector,
    this._inputErrorClass = settings.inputErrorClass,
    this._errorActiveClass = settings.errorActiveClass,
    this._errorTypeTemplate = settings.errorTypeTemplate,
    this._element = element
  }

  /*Сообщения об ошибках ввода*/
_showInputError (inputElement, errorMessage) {
  this._errorElement = this._element.querySelector(`${this._errorTypeTemplate}${inputElement.id}`);
  inputElement.classList.add(this._inputErrorClass);
  this._errorElement.textContent = errorMessage;
  this._errorElement.classList.add(this._errorActiveClass);
}

_hideInputError (inputElement) {
  this._errorElement = this._element.querySelector(`${this._errorTypeTemplate}${inputElement.id}`);
  inputElement.classList.remove(this._inputErrorClass);
  this._errorElement.classList.remove(this._errorActiveClass);
  this._errorElement.textContent = '';
}

/*Проверка валидности поля*/
_checkValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
}

/*Валидность формы*/
_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}


/*состояние кнопки*/
_toggleButtonState () {
  if (this._hasInvalidInput(this._inputList)) {
    this._buttonElement.setAttribute('disabled', true);
  } else {
    this._buttonElement.removeAttribute('disabled');
  }
}

/*Слушатели ввода*/
_setEventListeners (inputList) {
  inputList.forEach (inputElement => {
    inputElement.addEventListener('input', () => {
      this._checkValidity (inputElement);
      this._toggleButtonState ();
    });
  });
}

enableValidation () {
  this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector))
  this._buttonElement = this._element.querySelector(this._submitButtonSelector);
  this._toggleButtonState ();
  this._setEventListeners (this._inputList);
};

}

