const cssContext = require.context('./css', true, /\.css$/i, 'sync');
cssContext.keys().forEach(cssContext);

import {
    editButton, addButton, editForm, addForm, nameInput, jobInput,
    profileTitle, profileDescription, editPopup, addPopup, imagePopup,
    editSubmitButton, addSubmitButton, cardNameInput, cardUrlInput,
    avatarPopup, avatarForm, avatarInput, avatarSubmitButton,
    profileAvatar, avatarEditButton, citiesList, cardTemplate,
    validationSettings
} from '../src/js/constants.js';

import { openModal, closeModal, setupPopup } from '../src/js/modal.js';
import { createCard, renderCards } from '../src/js/card.js';
import { enableValidation, clearValidation } from '../src/js/validation.js';
import {
    getUserInfo, getInitialCards, updateProfile, likeCard,
    unlikeCard, deleteCard as apiDeleteCard, addNewCard, updateAvatar
} from '../src/js/api.js';

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

function renderLoading(button, isLoading, text = 'Сохранить') {
    button.textContent = isLoading ? 'Сохранение...' : text;
}

enableValidation(validationSettings);
setupPopup(editPopup);
setupPopup(addPopup);
setupPopup(imagePopup);
setupPopup(avatarPopup);

function handleLikeCard(cardId, likeButton, likeCount) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const apiCall = isLiked ? unlikeCard(cardId) : likeCard(cardId);
    apiCall
        .then(updatedCard => {
            likeCount.textContent = updatedCard.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.error('Error updating like:', err));
}

function handleDeleteCard(cardId, cardElement) {
    apiDeleteCard(cardId)
        .then(() => cardElement.remove())
        .catch(err => console.error('Error deleting card:', err));
}

function handleImageClick(cardInfo) {
    popupImage.src = cardInfo.link;
    popupImage.alt = cardInfo.name;
    popupCaption.textContent = cardInfo.name;
    openModal(imagePopup);
}

let currentUserId;
let currentCards = [];

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        currentUserId = userData._id;
        currentCards = cards;
        renderCards(currentCards, currentUserId, handleDeleteCard, handleLikeCard, handleImageClick);
    })
    .catch(err => console.error('Error loading data:', err));

editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editForm, validationSettings);
    openModal(editPopup);
});

addButton.addEventListener('click', () => {
    addForm.reset();
    clearValidation(addForm, validationSettings);
    openModal(addPopup);
});

avatarEditButton.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationSettings);
    openModal(avatarPopup);
});

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (editSubmitButton.disabled) return;
    renderLoading(editSubmitButton, true);
    updateProfile(nameInput.value, jobInput.value)
        .then(userData => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closeModal(editPopup);
        })
        .catch(err => console.error('Error updating profile:', err))
        .finally(() => renderLoading(editSubmitButton, false));
});

addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (addSubmitButton.disabled) return;
    renderLoading(addSubmitButton, true, 'Создать');
    addNewCard(cardNameInput.value, cardUrlInput.value)
        .then(newCard => {
            currentCards.unshift(newCard);
            renderCards(currentCards, currentUserId, handleDeleteCard, handleLikeCard, handleImageClick);
            addForm.reset();
            closeModal(addPopup);
        })
        .catch(err => console.error('Error adding card:', err))
        .finally(() => renderLoading(addSubmitButton, false, 'Создать'));
});

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!avatarInput || avatarSubmitButton.disabled) return;

    const avatarUrl = avatarInput.value;
    if (!avatarUrl) return;

    renderLoading(avatarSubmitButton, true);
    updateAvatar(avatarUrl)
        .then(userData => {
            profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
        })
        .catch(err => {
            console.error('Error updating avatar:', err);
            const errorElement = avatarForm.querySelector('.avatar-input-error');
            if (errorElement) {
                errorElement.textContent = 'Ошибка обновления аватара';
                errorElement.classList.add('popup__error_visible');
            }
        })
        .finally(() => renderLoading(avatarSubmitButton, false));
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