import { cardTemplate, citiesList } from './constants.js';

export function createCard(cardData, currentUserId, handleDelete, handleLike, handleImageClick) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const likeCount = card.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    if (cardData.owner._id === currentUserId) {
        deleteButton.addEventListener('click', () => handleDelete(cardData._id, card));
    } else {
        deleteButton.remove();
    }

    const isLiked = cardData.likes.some(like => like._id === currentUserId);
    likeButton.classList.toggle('card__like-button_is-active', isLiked);

    likeButton.addEventListener('click', () => handleLike(cardData._id, likeButton, likeCount));
    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return card;
}

export function renderCards(cards, currentUserId, handleDelete, handleLike, handleImageClick) {
    while (citiesList.firstChild) {
        citiesList.removeChild(citiesList.firstChild);
    }

    const fragment = document.createDocumentFragment();

    cards.forEach(cardData => {
        fragment.appendChild(
            createCard(cardData, currentUserId, handleDelete, handleLike, handleImageClick)
        );
    });

    citiesList.appendChild(fragment);
}

export function toggleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}