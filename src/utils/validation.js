export const validateLogin = (login) => {
    if (!login) {
        return 'Логин обязателен';
    } else if (login.length < 3) {
        return 'Логин должен содержать минимум 3 символа';
    }
    return '';
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return 'Email обязателен';
    } else if (!emailRegex.test(email)) {
        return 'Введите корректный email';
    }
    return '';
};

export const validatePassword = (password) => {
    if (!password) {
        return 'Пароль обязателен';
    } else if (password.length < 6) {
        return 'Пароль должен содержать минимум 6 символов';
    }
    return '';
};