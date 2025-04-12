import {cardTemplate, citiesList} from './constants.js';
import {openModal} from './modal.js';

export function createCard(cardInfo, deleteCallback, likeCallback) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cityName = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cityName.textContent = cardInfo.name;

    deleteButton.addEventListener('click', function () {
        deleteCallback(card);
    });

    likeButton.addEventListener('click', likeCallback);

    cardImage.addEventListener('click', function () {
        const imagePopup = document.querySelector('.popup_type_image');
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = cardInfo.link;
        popupImage.alt = cardInfo.name;
        popupCaption.textContent = cardInfo.name;

        openModal(imagePopup);
    });

    return card;
}

export function toggleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(card) {
    card.remove();
}

export function renderCards(cardsArray) {
    cardsArray.forEach(function (cardInfo) {
        const cardElement = createCard(cardInfo, deleteCard, toggleLike);
        citiesList.appendChild(cardElement);
    });
}