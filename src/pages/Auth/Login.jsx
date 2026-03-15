import React, { useState } from 'react';
import './Auth.css'; // Подключаем стили

const Login = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    login: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    login: false,
    password: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Валидация логина (может быть email или просто логин)
  const validateLogin = (login) => {
    if (!login) {
      return 'Логин обязателен';
    } else if (login.length < 3) {
      return 'Логин должен содержать минимум 3 символа';
    }
    return '';
  };

  // Валидация пароля
  const validatePassword = (password) => {
    if (!password) {
      return 'Пароль обязателен';
    } else if (password.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    return '';
  };

  // Обработка изменений в полях
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Очищаем серверную ошибку при изменении полей
    setServerError('');

    // Валидация при изменении
    if (name === 'login') {
      setErrors({
        ...errors,
        login: validateLogin(value)
      });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        password: validatePassword(value)
      });
    }
  };

  // Отметка поля как "тронутого" при потере фокуса
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация всех полей перед отправкой
    const loginError = validateLogin(formData.login);
    const passwordError = validatePassword(formData.password);
    
    setErrors({
      login: loginError,
      password: passwordError
    });
    
    setTouched({
      login: true,
      password: true
    });

    // Если есть ошибки валидации, не отправляем
    if (loginError || passwordError) {
      return;
    }

    // Отправка данных на бэк
    setIsLoading(true);
    setServerError('');

    try {
      // Здесь будет реальный запрос к API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при входе');
      }

      // Успешный вход
      console.log('Успешный вход:', data);
      
      // Сохраняем токен/данные пользователя
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Перенаправляем на главную или показываем успех
      alert('Успешный вход!');
      
      // Здесь можно добавить редирект
      // window.location.href = '/profile';

    } catch (error) {
      console.error('Ошибка:', error);
      setServerError(error.message || 'Неверный логин или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          С возвращением! <span className="emoji">🎉</span>
        </h1>
        <p className="login-subtitle">Войдите, чтобы копить дальше</p>
        
        {serverError && (
          <div className="server-error">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login" className="form-label">
              Логин
            </label>
            <input
              type="text"
              id="login"
              name="login"
              className={`form-input ${touched.login && errors.login ? 'input-error' : ''}`}
              placeholder="Введите логин или email"
              value={formData.login}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
            />
            {touched.login && errors.login && (
              <span className="error-message">{errors.login}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
              placeholder="Введите пароль"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
            />
            {touched.password && errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти в систему'}
          </button>
        </form>

        <div className="register-link">
          Нет аккаунта? <a href="/Register">Регистрация</a>
        </div>
      </div>
    </div>
  );
};

export default Login;