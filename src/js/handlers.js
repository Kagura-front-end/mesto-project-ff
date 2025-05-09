import {closeModal} from './modal.js';
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

export function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
}

export function handleAddFormSubmit(evt, createCardFn, deleteCardFn, toggleLikeFn, handleImageClick) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };

    const cardElement = createCardFn(newCard, deleteCardFn, toggleLikeFn, handleImageClick);
    citiesList.prepend(cardElement);

    evt.target.reset();
    closeModal(addPopup);
}
