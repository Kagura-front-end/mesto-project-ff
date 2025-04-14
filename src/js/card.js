import {cardTemplate, citiesList} from './constants.js';

export function createCard(cardInfo, deleteCallback, likeCallback, handleImageClick) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cityName = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cityName.textContent = cardInfo.name;

    deleteButton.addEventListener('click', () => deleteCallback(card));
    likeButton.addEventListener('click', likeCallback);
    cardImage.addEventListener('click', () => handleImageClick(cardInfo));

    return card;
}

export function toggleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(card) {
    card.remove();
}

export function renderCards(cardsArray, handleImageClick) {
    cardsArray.forEach((cardInfo) => {
        const cardElement = createCard(cardInfo, deleteCard, toggleLike, handleImageClick);
        citiesList.appendChild(cardElement);
    });
}