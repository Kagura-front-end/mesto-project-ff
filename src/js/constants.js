// DOM элементы
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
export const cardNameInput = addForm.querySelector('.popup__input_type_card-name');
export const cardUrlInput = addForm.querySelector('.popup__input_type_url');
export const citiesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;