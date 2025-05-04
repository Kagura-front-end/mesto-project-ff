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
        if (openedPopup) closeModal(openedPopup);
    }
}


export function setupPopup(popup) {
    const closeButton = popup.querySelector('.popup__close');


    closeButton.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) closeModal(popup);
    });
}
