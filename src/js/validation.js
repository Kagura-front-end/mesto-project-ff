export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorElementSelector: '.popup__error'
};

export const defaultErrorMessages = {
    required: 'Это обязательное поле',
    minLength: (min, current) => `Минимальная длина - ${min} символа, сейчас ${current}`,
    maxLength: (max, current) => `Максимальная длина - ${max} символа, сейчас ${current}`,
    patternMismatch: 'Разрешены только буквы, пробелы и дефисы',
    urlMismatch: 'Введите URL-адрес (начинается с http:// или https://)',
    imageUrlInvalid: 'Ссылка не ведет на изображение'
};

const namePattern = /^[\p{L}\s-]+$/u;

function showInputError(form, input, errorMessage, settings) {
    const errorElement = form.querySelector(`#${input.id}-error`) ||
        form.querySelector(settings.errorElementSelector);
    if (errorElement) {
        input.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
    }
}

function hideInputError(form, input, settings) {
    const errorElement = form.querySelector(`#${input.id}-error`) ||
        form.querySelector(settings.errorElementSelector);
    if (errorElement) {
        input.classList.remove(settings.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(settings.errorClass);
    }
}

function getErrorMessage(input) {
    if (input.validity.valueMissing) {
        return input.dataset.errorRequired || defaultErrorMessages.required;
    }
    if (input.validity.tooShort) {
        return defaultErrorMessages.minLength(input.minLength, input.value.length);
    }
    if (input.validity.tooLong) {
        return defaultErrorMessages.maxLength(input.maxLength, input.value.length);
    }
    if (input.hasAttribute('data-name-pattern') && !namePattern.test(input.value)) {
        return input.dataset.errorPattern || defaultErrorMessages.patternMismatch;
    }
    if (input.validity.typeMismatch && input.type === 'url') {
        return input.dataset.errorUrl || defaultErrorMessages.urlMismatch;
    }
    return input.validationMessage;
}

function checkInputValidity(form, input, settings) {
    let isValid = input.validity.valid;

    if (input.hasAttribute('data-name-pattern') && !namePattern.test(input.value)) {
        isValid = false;
        input.setCustomValidity(defaultErrorMessages.patternMismatch);
    }
    else if (input.type === 'url' && !/^https?:\/\//i.test(input.value)) {
        isValid = false;
        input.setCustomValidity(defaultErrorMessages.urlMismatch);
    } else {
        input.setCustomValidity('');
    }

    if (!isValid) {
        showInputError(form, input, getErrorMessage(input), settings);
    } else {
        hideInputError(form, input, settings);
    }
}

function toggleButtonState(form, inputs, button, settings) {
    const isValid = inputs.every(input => {
        const basicValid = input.validity.valid;
        const patternValid = input.hasAttribute('data-name-pattern')
            ? namePattern.test(input.value)
            : true;
        const urlValid = input.type === 'url'
            ? /^https?:\/\//i.test(input.value)
            : true;

        return basicValid && patternValid && urlValid;
    });

    button.disabled = !isValid;
    button.classList.toggle(settings.inactiveButtonClass, !isValid);
}

function setupFormValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach(input => {
        if (input.classList.contains('popup__input_type_name') ||
            input.classList.contains('popup__input_type_description') ||
            input.classList.contains('popup__input_type_card-name')) {
            input.setAttribute('data-name-pattern', 'true');
            input.dataset.errorPattern = defaultErrorMessages.patternMismatch;
        }

        if (input.type === 'url') {
            input.dataset.errorUrl = defaultErrorMessages.urlMismatch;
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, settings);
            toggleButtonState(form, inputs, button, settings);
        });

        input.addEventListener('blur', () => {
            checkInputValidity(form, input, settings);
        });
    });

    // Handle form resets
    form.addEventListener('reset', () => {
        inputs.forEach(input => hideInputError(form, input, settings));
        toggleButtonState(form, inputs, button, settings);
    });

    toggleButtonState(form, inputs, button, settings);
}

export function enableValidation(settings = validationSettings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form => {
        form.setAttribute('novalidate', '');
        setupFormValidation(form, settings);
    });
}

export function clearValidation(form, settings = validationSettings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach(input => {
        hideInputError(form, input, settings);
        input.setCustomValidity('');
    });

    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
}