const cssContext = require.context('/src/css', true, /\.css$/i, 'sync');
cssContext.keys().forEach(cssContext);

import {
    editButton,
    addButton,
    editForm,
    addForm,
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    editPopup,
    addPopup,
    imagePopup,
    editSubmitButton,
    addSubmitButton,
    cardNameInput,
    cardUrlInput
} from '../src/js/constants.js';

import { initialPlaces } from './js/places.js';
import { openModal, closeModal, setupPopup } from '../src/js/modal.js';
import { createCard, toggleLike, deleteCard, renderCards } from '../src/js/card.js';
import { handleEditFormSubmit, handleAddFormSubmit } from '../src/js/handlers.js';
import { enableValidation, clearValidation, validationSettings } from '../src/js/validation.js';

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

enableValidation(validationSettings);

setupPopup(editPopup);
setupPopup(addPopup);
setupPopup(imagePopup);

renderCards(initialPlaces, handleImageClick);

function handleImageClick(cardInfo) {
    popupImage.src = cardInfo.link;
    popupImage.alt = cardInfo.name;
    popupCaption.textContent = cardInfo.name;
    openModal(imagePopup);
}

editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    clearValidation(editForm, validationSettings);
    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));

    openModal(editPopup);
});

addButton.addEventListener('click', () => {
    addForm.reset();
    clearValidation(addForm, validationSettings);
    openModal(addPopup);
});

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (editSubmitButton.disabled) return;

    handleEditFormSubmit(evt);
    closeModal(editPopup);
});

addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (addSubmitButton.disabled) return;

    handleAddFormSubmit(evt, createCard, deleteCard, toggleLike, handleImageClick);
    closeModal(addPopup);
});

cardNameInput.addEventListener('input', () => {
    if (cardNameInput.validity.tooLong) {
        cardNameInput.setCustomValidity(`Max length: 30. Current: ${cardNameInput.value.length}`);
    } else {
        cardNameInput.setCustomValidity('');
    }
});

cardUrlInput.addEventListener('input', () => {
    if (!cardUrlInput.validity.valid) {
        cardUrlInput.setCustomValidity('Please enter a valid URL');
    } else {
        cardUrlInput.setCustomValidity('');
    }
});