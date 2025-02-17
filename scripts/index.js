const cardTemplate = document.querySelector("#card-template").content;
const citiesList = document.querySelector(".places__list");


function deleteFunction(card) {
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
        const cardElement = addingCard(cardInfo, deleteFunction);
        citiesList.appendChild(cardElement);
    });
}


renderCards(initialCards);

