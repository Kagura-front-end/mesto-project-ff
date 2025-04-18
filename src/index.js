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
    imagePopup
} from '../src/js/constants.js';

import {initialPlaces} from './js/places.js';
import {openModal, setupPopup} from '../src/js/modal.js';
import {createCard, toggleLike, deleteCard, renderCards} from '../src/js/card.js';
import {handleEditFormSubmit, handleAddFormSubmit} from '../src/js/handlers.js';

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

function handleImageClick(cardInfo) {
    popupImage.src = cardInfo.link;
    popupImage.alt = cardInfo.name;
    popupCaption.textContent = cardInfo.name;
    openModal(imagePopup);
}

setupPopup(editPopup);
setupPopup(addPopup);
setupPopup(imagePopup);

renderCards(initialPlaces, handleImageClick);

editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editPopup);
});

addButton.addEventListener('click', () => openModal(addPopup));

editForm.addEventListener('submit', handleEditFormSubmit);

addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleAddFormSubmit(evt, createCard, deleteCard, toggleLike, handleImageClick);
    addForm.reset();
});