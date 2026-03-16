import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            console.log('Register with:', formData);
            navigate('/login');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Регистрация</h1>
                <p className="auth-subtitle">Создайте личный профиль копилок</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Input
                            type="text"
                            value={formData.login}
                            onChange={(e) => setFormData({...formData, login: e.target.value})}
                            placeholder="Придумайте логин"
                            disabled={isLoading}
                            className="auth-input"
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Придумайте пароль"
                            disabled={isLoading}
                            className="auth-input"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        loading={isLoading}
                        className="auth-button"
                    >
                        {isLoading ? 'Сохранение...' : 'Сохранить аккаунт'}
                    </Button>
                </form>

                <div className="auth-footer">
                    Уже есть аккаунт? <Link to="/login">Вход</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;