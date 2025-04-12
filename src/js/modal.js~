import {editPopup, addPopup, imagePopup} from './constants.js';

export function openModal(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

export function closeModal(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

export function setupPopup(popup) {
    const closeButton = popup.querySelector('.popup__close');

    closeButton.addEventListener('click', function () {
        closeModal(popup);
    });

    popup.addEventListener('mousedown', function (evt) {
        if (evt.target === evt.currentTarget) {
            closeModal(evt.currentTarget);
        }
    });
}

// Инициализация всех попапов
export function initModals() {
    setupPopup(editPopup);
    setupPopup(addPopup);
    setupPopup(imagePopup);
}