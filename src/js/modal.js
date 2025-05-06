export function openModal(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapeKey);
}

export function closeModal(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) closeModal(openedPopup);
    }
}

export function setupPopup(popup) {
    const closeButton = popup.querySelector('.popup__close');

    if (!closeButton) {
        console.error('Close button not found in popup:', popup);
        return;
    }

    closeButton.replaceWith(closeButton.cloneNode(true));
    const newCloseButton = popup.querySelector('.popup__close');

    newCloseButton.addEventListener('click', () => {
        closeModal(popup);
    });

    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
            closeModal(popup);
        }
    });
}


