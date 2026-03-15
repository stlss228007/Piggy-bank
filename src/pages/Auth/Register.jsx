import React, { useState } from 'react';
import './Register.css'; // Подключаем стили

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Валидация email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email обязателен';
    } else if (!emailRegex.test(email)) {
      return 'Введите корректный email';
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

    // Валидация при изменении
    if (name === 'email') {
      setErrors({
        ...errors,
        email: validateEmail(value)
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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация всех полей перед отправкой
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    setTouched({
      email: true,
      password: true
    });

    // Если нет ошибок, отправляем данные
    if (!emailError && !passwordError) {
      console.log('Отправка данных на бэк:', formData);
      // Здесь будет запрос к API
      // fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      alert('Аккаунт успешно создан! (тест)');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1 className="registration-title">Регистрация</h1>
        <p className="registration-subtitle">Создайте личный профиль копии</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Придумайте логин
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Придумайте пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
              placeholder="Минимум 6 символов"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
          >
            Создать аккаунт
          </button>
        </form>

        <div className="login-link">
          Уже есть аккаунт? <a href="/Login">Войти</a>
        </div>
      </div>
    </div>
  );
};

export default Registration;