const cssContext = require.context('./css', true, /\.css$/i, 'sync');
cssContext.keys().forEach(cssContext);

import {
    editButton, addButton, editForm, addForm, nameInput, jobInput,
    profileTitle, profileDescription, editPopup, addPopup, imagePopup,
    editSubmitButton, addSubmitButton, cardNameInput, cardUrlInput,
    avatarPopup, avatarForm, avatarInput, avatarSubmitButton,
    profileAvatar, avatarEditButton, citiesList, confirmPopup
} from '../src/js/constants.js';

import {openModal, closeModal, setupPopup} from '../src/js/modal.js';
import {createCard} from '../src/js/card.js';
import {enableValidation, clearValidation} from '../src/js/validation.js';
import {
    getUserInfo, getInitialCards, updateProfile, likeCard,
    unlikeCard, deleteCard as apiDeleteCard, addNewCard, updateAvatar
} from '../src/js/api.js';

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorElementSelector: '.popup__error'
};

enableValidation(validationSettings);


let currentUserId = null;
let currentCards = [];

async function safeOperation(operation) {
    try {
        return await operation();
    } catch (err) {
        console.error('Ошибка при выполнении операции:', err);
        return null;
    }
}

function handleLikeCard(cardId, likeButton, likeCount) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const apiCall = isLiked ? unlikeCard(cardId) : likeCard(cardId);
    safeOperation(() => apiCall).then(updatedCard => {
        if (updatedCard) {
            likeCount.textContent = updatedCard.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
            const cardIndex = currentCards.findIndex(card => card._id === cardId);
            if (cardIndex !== -1) {
                currentCards[cardIndex] = updatedCard;
            }
        }
    });
}

function handleDeleteCard(cardId, cardElement) {
    safeOperation(() => apiDeleteCard(cardId)).then(() => {
        cardElement.remove();
        currentCards = currentCards.filter(card => card._id !== cardId);
    });
}

function handleImageClick(cardInfo) {
    safeOperation(() => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = cardInfo.link;
        });
    }).then(isValid => {
        popupImage.src = isValid ? cardInfo.link : '';
        popupImage.alt = cardInfo.name;
        popupImage.style.display = isValid ? 'block' : 'none';
        popupCaption.textContent = isValid ? cardInfo.name : 'Изображение недоступно';
        openModal(imagePopup);
    });
}

function renderLoading(button, isLoading, text = 'Сохранить') {
    if (button) {
        button.textContent = isLoading ? 'Сохранение...' : text;
        button.disabled = isLoading;
    }
}

function renderCards(cards, currentUserId, handleDeleteCard, handleLikeCard, handleImageClick) {
    while (citiesList.firstChild) {
        citiesList.removeChild(citiesList.firstChild);
    }

    cards.forEach(cardData => {
        const cardElement = createCard(
            cardData,
            currentUserId,
            handleDeleteCard,
            handleLikeCard,
            handleImageClick
        );
        citiesList.append(cardElement);
    });
}


function initializeApp() {
    enableValidation(validationSettings);
    setupPopup(editPopup);
    setupPopup(addPopup);
    setupPopup(imagePopup);
    setupPopup(avatarPopup);
    setupPopup(confirmPopup);


    document.querySelectorAll('img').forEach(img => {
        img.onerror = () => {
            img.style.display = 'none';
            img.parentElement?.classList?.add('image-error');
        };
    });

    safeOperation(() => Promise.all([
        getUserInfo(),
        getInitialCards()
    ])).then(([userData, cards]) => {
        profileTitle.textContent = userData?.name || 'Пользователь';
        profileDescription.textContent = userData?.about || 'Расскажите о себе';
        profileAvatar.style.backgroundImage = `url(${userData?.avatar || './images/avatar-default.jpg'})`;

        currentUserId = userData?._id || null;
        currentCards = Array.isArray(cards) ? cards : [];
        renderCards(currentCards, currentUserId, handleDeleteCard, handleLikeCard, handleImageClick);
    });
}

function setupEventListeners() {
    if (editButton) editButton.addEventListener('click', () => {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDescription.textContent;
        clearValidation(editForm, validationSettings);
        openModal(editPopup);
    });

    if (addButton) addButton.addEventListener('click', () => {
        addForm.reset();
        clearValidation(addForm, validationSettings);
        openModal(addPopup);
    });

    if (avatarEditButton) avatarEditButton.addEventListener('click', () => {
        avatarForm.reset();
        clearValidation(avatarForm, validationSettings);
        openModal(avatarPopup);
    });

    if (editForm) editForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        renderLoading(editSubmitButton, true);
        safeOperation(() => updateProfile(nameInput.value, jobInput.value))
            .then(userData => {
                if (userData) {
                    profileTitle.textContent = userData.name;
                    profileDescription.textContent = userData.about;
                    closeModal(editPopup);
                }
            })
            .finally(() => renderLoading(editSubmitButton, false));
    });

    if (addForm) addForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        renderLoading(addSubmitButton, true, 'Создать');
        safeOperation(() => addNewCard(cardNameInput.value, cardUrlInput.value))
            .then(newCard => {
                if (newCard) {
                    const newCardElement = createCard(
                        newCard,
                        currentUserId,
                        handleDeleteCard,
                        handleLikeCard,
                        handleImageClick
                    );
                    citiesList.prepend(newCardElement);
                    addForm.reset();
                    closeModal(addPopup);
                } else {
                    const errorElement = addForm.querySelector('.link-input-error');
                    if (errorElement) {
                        errorElement.textContent = 'Не удалось создать карточку';
                        errorElement.classList.add('popup__error_visible');
                    }
                }
            })
            .finally(() => renderLoading(addSubmitButton, false, 'Создать'));
    });

    if (avatarForm) avatarForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        renderLoading(avatarSubmitButton, true);
        safeOperation(() => updateAvatar(avatarInput.value))
            .then(userData => {
                if (userData) {
                    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
                    closeModal(avatarPopup);
                }
            })
            .finally(() => renderLoading(avatarSubmitButton, false));
    });
}

(async () => {
    try {
        await initializeApp();
        setupEventListeners();
    } catch (err) {
        console.error('Не удалось инициализировать приложение:', err);
    }
})();