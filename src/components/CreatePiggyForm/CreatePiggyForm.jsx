import { useState } from 'react'
import './CreatePiggyForm.css'

function CreatePiggyForm({ onSubmit, onCancel }) {
    
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const validate = () => {

        const newErrors = {}
        
        if (!title.trim()) {
            newErrors.title = 'Введите название копилки'
        } else if (title.length > 35) {
            newErrors.title = 'Максимум 35 символов'
        }
        
        if (!amount) {
            newErrors.amount = 'Введите сумму цели'
        } else if (Number(amount) < 1) {
            newErrors.amount = 'Сумма должна быть больше 0'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        
        if (!validate()) return
        
        setIsLoading(true)
        try {
            await onSubmit({
                title: title.trim(),
                amount: Number(amount)
            })
            setTitle('')
            setAmount('')
        } catch (error) {
            setErrors({ form: error.message })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <form className="create-form" onSubmit={handleSubmit}>

            <p className="form-subtitle">
                Начните откладывать на мечту прямо сейчас
            </p>

            <div className="form-group">

                <label className="form-label">
                    Название копилки
                </label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Напр. Отпуск в Исландии"
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    maxLength={35}
                    disabled={isLoading}
                />
                {errors.title && (
                    <div className="error-message">{errors.title}</div>
                )}

            </div>

            <div className="form-group">

                <label className="form-label">
                    Сумма цели (₽)
                </label>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="150 000"
                    className={`form-input ${errors.amount ? 'error' : ''}`}
                    min="1"
                    step="1"
                    disabled={isLoading}
                />
                {errors.amount && (
                    <div className="error-message">{errors.amount}</div>
                )}

            </div>

            {errors.form && (
                <div className="form-error">{errors.form}</div>
            )}

            <div className="form-actions">

                <button 
                    type="button" 
                    className="form-button cancel"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Отмена
                </button>

                <button 
                    type="submit" 
                    className="form-button submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Создание...' : 'Создать'}
                </button>
                
            </div>
        </form>
    )
}

export default CreatePiggyForm