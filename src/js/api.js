const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: 'fcaeb073-c78a-4bd4-8c97-9750945a38c5',
        'Content-Type': 'application/json'
    }
};

const endpoints = {
    /** POST , name, link - добавляет новую карточку  **/
    addNewCard: `${config.baseUrl}/cards`,

    /** DELETE , cardId - удаляет карточку  **/
    deleteCard: `${config.baseUrl}/cards/`,

    /** GET - возвращает все карточки  **/
    getInitialCards: `${config.baseUrl}/cards`,

    /** GET - возвращает информацию о текущем пользователе  **/
    getUserInfo: `${config.baseUrl}/users/me`,

    /** PUT , cardId - добавляет лайк  **/
    likeCard: `${config.baseUrl}/cards/likes/`,

    /** DELETE , cardId - удаляет лайк  **/
    unlikeCard: `${config.baseUrl}/cards/likes/`,

    /** PATCH , avatar - обновляет аватар   **/
    updateAvatar: `${config.baseUrl}/users/me/avatar`,

    /** PATCH , name, about - обновляет профиль  **/
    updateProfile: `${config.baseUrl}/users/me`,
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const addNewCard = (name, link) => {
    return fetch(`${endpoints.addNewCard}`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
        .then(checkResponse);
};

export const deleteCard = (cardId) => {
    return fetch(`${endpoints.deleteCard}${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
};

export const getInitialCards = () => {
    return fetch(`${endpoints.getInitialCards}`, {
        headers: config.headers
    })
        .then(checkResponse);
};

export const getUserInfo = () => {
    return fetch(`${endpoints.getUserInfo}`, {
        headers: config.headers
    })
        .then(checkResponse);
};

export const likeCard = (cardId) => {
    return fetch(`${endpoints.likeCard}${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkResponse);
};

export const unlikeCard = (cardId) => {
    return fetch(`${endpoints.unlikeCard}${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
};

export const updateAvatar = (avatarUrl) => {
    return fetch(`${endpoints.updateAvatar}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then(checkResponse);
};

export const updateProfile = (name, about) => {
    return fetch(`${endpoints.updateProfile}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
        .then(checkResponse);
};


