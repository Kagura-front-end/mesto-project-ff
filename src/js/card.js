import {cardTemplate} from './constants.js';

export function createCard(cardData, currentUserId, handleDeleteClick, handleLikeClick, handleImageClick) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const isLiked = cardData.likes?.some(user => user._id === currentUserId) || false;
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeCount.textContent = cardData.likes?.length || 0;

    if (cardData.owner?._id === currentUserId) {
        deleteButton.addEventListener('click', () => handleDeleteClick(cardData._id, cardElement));
    } else {
        deleteButton.style.display = 'none';
    }

    likeButton.addEventListener('click', () => handleLikeClick(cardData._id, likeButton, likeCount));
    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return cardElement;
}

export function setupDeleteConfirmation() {
}