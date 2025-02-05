// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// @todo: Темплейт карточки


// @todo: DOM узлы


// @todo: Функция создания карточки


// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу




const cardTemplate = document.querySelector("#card-template").content;
const citiesList = document.querySelector(".places__list");


function DeleteFunction(card) {
    card.remove();
}


function addingCard(cardInfo, deleteCallback) {
    const card = cardTemplate.querySelector(".card");
    const cardElement = card.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cityName = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");


    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cityName.textContent = cardInfo.name;


    deleteButton.addEventListener("click", function () {
        deleteCallback(cardElement);
    });


    return cardElement;
}


function renderCards(cardsArray) {
    cardsArray.forEach(function (cardInfo) {
        const cardElement = addingCard(cardInfo, DeleteFunction);
        citiesList.appendChild(cardElement);
    });
}


renderCards(initialCards);




/*
test*/

