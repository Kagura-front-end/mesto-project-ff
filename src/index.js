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
    addPopup
} from '../src/js/constants.js';

import {initialPlaces} from './js/places.js';
// Рендер начальных карточек
renderCards(initialPlaces);

import {initModals, openModal, closeModal} from '../src/js/modal.js';
// Инициализация модальных окон
initModals();

import {createCard, toggleLike, deleteCard, renderCards} from '../src/js/card.js';
import {handleEditFormSubmit, handleAddFormSubmit} from '../src/js/handlers.js';


// Обработчики кнопок
editButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editPopup);
});

addButton.addEventListener('click', function () {
    addForm.reset();
    openModal(addPopup);
});

// Обработчики форм
editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', function (evt) {
    handleAddFormSubmit(evt, createCard, deleteCard, toggleLike);
});

