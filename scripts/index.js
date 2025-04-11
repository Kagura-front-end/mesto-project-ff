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
} from '../src/components/constants.js';
import {initModals, openModal, closeModal} from '../src/components/Modal.js';
import {createCard, toggleLike, deleteCard, renderCards} from '../src/components/Card.js';
import {handleEditFormSubmit, handleAddFormSubmit} from '../src/components/handlers.js';

// Инициализация модальных окон
initModals();

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

// Рендер начальных карточек
renderCards(initialCards);