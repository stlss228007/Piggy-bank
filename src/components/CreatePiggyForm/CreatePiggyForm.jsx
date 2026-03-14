import { useState } from 'react'
import { useAsync } from '../../hooks/useAsync'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './CreatePiggyForm.css'

function CreatePiggyForm({ onSubmit, onCancel }) {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [errors, setErrors] = useState({})

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

    const { 
        execute: submitForm, 
        loading 
    } = useAsync(onSubmit)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validate()) return
        
        try {
            await submitForm({
                title: title.trim(),
                amount: Number(amount)
            })
            setTitle('')
            setAmount('')
            onCancel()
        } catch (error) {
            setErrors({ form: error.message || 'Ошибка при создании' })
        }
    }

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <p className="form-subtitle">
                Начните откладывать на мечту прямо сейчас
            </p>

            <Input
                label="Название копилки"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Напр. Отпуск в Исландии"
                error={errors.title}
                maxLength={35}
                disabled={loading}
                required
            />

            <Input
                label="Сумма цели (₽)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="150 000"
                error={errors.amount}
                min="1"
                step="1"
                disabled={loading}
                required
            />

            {errors.form && (
                <div className="form-error">{errors.form}</div>
            )}

            <div className="form-actions">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                    fullWidth
                >
                    Отмена
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                    fullWidth
                >
                    Создать
                </Button>
            </div>
        </form>
    )
}

export default CreatePiggyForm