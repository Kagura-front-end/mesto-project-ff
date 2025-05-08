export const editPopup = document.querySelector('.popup_type_edit');
export const addPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
export const avatarPopup = document.querySelector('.popup_type_avatar');


export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image');

export const editForm = document.querySelector('.popup__form[name="edit-profile"]');
export const addForm = document.querySelector('.popup__form[name="new-place"]');
export const avatarForm = document.querySelector('.popup__form[name="update-avatar"]');

export const confirmPopup = document.querySelector('.popup_type_confirm');
export const confirmButton = confirmPopup.querySelector('.popup__confirm-button');

export const nameInput = editForm.querySelector('.popup__input_type_name');
export const jobInput = editForm.querySelector('.popup__input_type_description');
export const editSubmitButton = editForm.querySelector('.popup__button');

export const cardNameInput = addForm.querySelector('.popup__input_type_card-name');
export const cardUrlInput = addForm.querySelector('.popup__input_type_url');
export const addSubmitButton = addForm.querySelector('.popup__button');

export const avatarInput = document.getElementById('avatar-input');
export const avatarSubmitButton = avatarForm.querySelector('.popup__button');
export const citiesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    errorElementSelector: '.popup__error',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};