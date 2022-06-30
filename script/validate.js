const selectorsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active',
  errorTypeTemplate: '.popup__input-error_type_'
}

/*Сообщения об ошибках ввода*/
const showInputError = (formElement, inputElement, errorMessage, select) => {
  const errorElement = formElement.querySelector(`${select.errorTypeTemplate}${inputElement.id}`);
  inputElement.classList.add(select.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(select.errorActiveClass);
};

const hideInputError = (formElement, inputElement, select) => {
  const errorElement = formElement.querySelector(`${select.errorTypeTemplate}${inputElement.id}`);
  inputElement.classList.remove(select.inputErrorClass);
  errorElement.classList.remove(select.errorActiveClass);
  errorElement.textContent = '';
};

/*Проверка валидности поля*/
const checkInputValidity = (formElement, inputElement, select) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,select);
  } else {
    hideInputError(formElement, inputElement, select);
  }
};

/*Валидность формы*/
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
};

/*Слушатели ввода*/
const setEventListeners = (formElement,select) => {
  const inputList = Array.from(formElement.querySelectorAll(select.inputSelector));
  const buttonElement = formElement.querySelector(select.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement,select);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/*Валидация отправки формы*/
const enableValidation = (select) => {
  const formList = Array.from(document.querySelectorAll(select.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement,select);
  });
};

enableValidation (selectorsList);