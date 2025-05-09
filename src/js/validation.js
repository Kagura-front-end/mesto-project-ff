export const defaultErrorMessages = {
    required: 'Это обязательное поле',
    minLength: (min, current) => `Минимальная длина - ${min} символа, сейчас ${current}`,
    maxLength: (max, current) => `Максимальная длина - ${max} символа, сейчас ${current}`,
    patternMismatch: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
};

const unicodeTextPattern = /^[\p{L}\s-]+$/u;

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

function getErrorMessage(input, defaultMessages) {
    if (input.validity.valueMissing) {
        return input.dataset.errorRequired || defaultMessages.required;
    }
    if (input.validity.tooShort) {
        return defaultMessages.minLength(input.minLength, input.value.length);
    }
    if (input.validity.tooLong) {
        return defaultMessages.maxLength(input.maxLength, input.value.length);
    }
    if (input.validity.patternMismatch) {
        return defaultMessages.patternMismatch;
    }
    if (
        input.classList.contains('popup__input_type_name') ||
        input.classList.contains('popup__input_type_description') ||
        input.classList.contains('popup__input_type_card-name')
    ) {
        if (!unicodeTextPattern.test(input.value)) {
            return defaultMessages.patternMismatch;
        }
    }
    return input.validationMessage;
}

function checkInputValidity(form, input, settings, messages) {
    if (!input.validity.valid || (input.classList.contains('popup__input_type_name') ||
        input.classList.contains('popup__input_type_description') ||
        input.classList.contains('popup__input_type_card-name')) && !unicodeTextPattern.test(input.value)) {
        showInputError(form, input, getErrorMessage(input, messages), settings);
    } else {
        hideInputError(form, input, settings);
    }
}

function toggleButtonState(form, inputs, button, settings) {
    const isValid = inputs.every(input =>
        input.validity.valid &&
        (!(input.classList.contains('popup__input_type_name') ||
            input.classList.contains('popup__input_type_description') ||
            input.classList.contains('popup__input_type_card-name')) || unicodeTextPattern.test(input.value))
    );
    button.disabled = !isValid;
    button.classList.toggle(settings.inactiveButtonClass, !isValid);
}

function setupFormValidation(form, settings, messages) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, settings, messages);
            toggleButtonState(form, inputs, button, settings);
        });

        input.addEventListener('blur', () => {
            checkInputValidity(form, input, settings, messages);
        });
    });

    form.addEventListener('reset', () => {
        inputs.forEach(input => hideInputError(form, input, settings));
        toggleButtonState(form, inputs, button, settings);
    });

    toggleButtonState(form, inputs, button, settings);
}

export function enableValidation(settings, messages = defaultErrorMessages) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form => {
        form.setAttribute('novalidate', '');
        setupFormValidation(form, settings, messages);
    });
}

export function clearValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach(input => {
        hideInputError(form, input, settings);
        input.setCustomValidity('');
    });

    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
}
