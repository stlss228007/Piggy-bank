import { memo, useState } from 'react'
import { depositMoney } from '../../services/piggy'
import './Card.css'

function Card({ id, title, amount, accumulated, onUpdate }) {

    const [depositAmount, setDepositAmount] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    
    const progress = Math.round((accumulated / amount) * 100)
    const remaining = amount - accumulated

    const handleDeposit = async () => {
        
        const numAmount = Number(depositAmount)

        if (!depositAmount || numAmount <= 0) {
            setError('Введите сумму больше 0')
            return
        }

        if (numAmount > remaining) {
            setError(`Максимум: ${remaining.toLocaleString()} ₽`)
            return
        }

        setIsLoading(true)
        setError('')

        try {
            await depositMoney(id, numAmount)
            setDepositAmount('')
            if (onUpdate) {
                onUpdate(id, numAmount)
            }
        } catch (err) {
            setError(err.message || 'Ошибка при внесении')
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleDeposit()
        }
    }

    return (

        <div className="card">

            <div className="card-label">ЦЕЛЬ НАКОПЛЕНИЯ</div>
            <h3 className="card-title">{title}</h3>
            
            <div className="amounts-row">

                <div className="amount-block">
                    <span className="amount-label">Накоплено</span>
                    <span className="current-amount">
                        {accumulated.toLocaleString()} ₽
                    </span>
                </div>

                <div className="amount-block">
                    <span className="amount-label">Из суммы</span>
                    <span className="target-amount">
                        {amount.toLocaleString()} ₽
                    </span>
                </div>

            </div>

            <div className="progress-wrapper">
                <div className="progress-bar-container">
                    <div 
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="stats-row">
                <span className="progress-percent">{progress}%</span>
                <span className="remaining-amount">
                    Осталось: {remaining.toLocaleString()} ₽
                </span>
            </div>

            <div className="deposit-section">
                <div className="deposit-input-group">

                    <input 
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Сумма..."
                        min="1"
                        max={remaining}
                        className="deposit-input"
                        disabled={isLoading}
                    />

                    <button 
                        className="deposit-button"
                        onClick={handleDeposit}
                        disabled={isLoading || !depositAmount}
                    >
                        {isLoading ? '...' : 'Внести'}
                    </button>

                </div>
                {error && <div className="deposit-error">{error}</div>}
            </div>
        </div>
    )
}

export default memo(Card)