import {closeModal} from './Modal.js';
import {
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    editPopup,
    addPopup,
    cardNameInput,
    cardUrlInput,
    citiesList
} from './constants.js';
import {createCard, toggleLike, deleteCard} from './Card.js';

export function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
}

export function handleAddFormSubmit(evt, createCardFn, deleteCardFn, toggleLikeFn) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };

    const cardElement = createCardFn(newCard, deleteCardFn, toggleLikeFn);
    citiesList.prepend(cardElement);

    evt.target.reset();
    closeModal(addPopup);
}