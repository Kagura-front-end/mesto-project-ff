export const editPopup = document.querySelector('.popup_type_edit');
export const addPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const editForm = document.querySelector('.popup__form[name="edit-profile"]');
export const addForm = document.querySelector('.popup__form[name="new-place"]');

export const nameInput = editForm.querySelector('.popup__input_type_name');
export const jobInput = editForm.querySelector('.popup__input_type_description');
export const nameError = editForm.querySelector('.name-input-error'); // Changed to match HTML
export const jobError = editForm.querySelector('.description-input-error'); // Changed to match HTML
export const editSubmitButton = editForm.querySelector('.popup__button');

export const cardNameInput = addForm.querySelector('.popup__input_type_card-name');
export const cardUrlInput = addForm.querySelector('.popup__input_type_url'); // Fixed typo (was '.popup__input_type_url')
export const cardNameError = addForm.querySelector('.place-name-input-error'); // Changed selector to match new HTML
export const cardUrlError = addForm.querySelector('.link-input-error'); // Changed selector to match new HTML
export const addSubmitButton = addForm.querySelector('.popup__button');

export const citiesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const defaultErrorMessages = {
    required: 'Вы пропустили это поле',
    minLength: (min, current) => `Минимальное количество символов: ${min}. Длина текста сейчас: ${current} символ${current === 1 ? '' : 'а'}.`,
    maxLength: (max, current) => `Максимальное количество символов: ${max}. Длина текста сейчас: ${current} символов.`,
    patternMismatch: 'Разрешены только буквы, пробелы и дефисы (-)',
    urlMismatch: 'Пожалуйста, введите корректный URL (начинается с http:// или https://)' // Updated error message
};