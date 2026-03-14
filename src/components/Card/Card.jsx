import { memo, useState } from 'react'
import { depositMoney } from '../../services/piggy'
import { useAsync } from '../../hooks/useAsync'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './Card.css'

function Card({ id, title, amount, accumulated, onUpdate }) {
    const [depositAmount, setDepositAmount] = useState('')
    const [localError, setLocalError] = useState('')
    
    const progress = Math.round((accumulated / amount) * 100)
    const remaining = amount - accumulated

    const { 
        execute: makeDeposit, 
        loading 
    } = useAsync((amount) => depositMoney(id, amount))

    const handleDeposit = async () => {
        const numAmount = Number(depositAmount)
        
        if (!depositAmount || numAmount <= 0) {
            setLocalError('Введите сумму больше 0')
            return
        }
        if (numAmount > remaining) {
            setLocalError(`Максимум: ${remaining.toLocaleString()} ₽`)
            return
        }

        try {
            await makeDeposit(numAmount)
            setDepositAmount('')
            setLocalError('')
            onUpdate(id, numAmount)
        } catch (err) {
            setLocalError(err.message || 'Ошибка при внесении')
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
                    <Input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.valueAsNumber)}
                        onKeyDown={handleKeyDown}
                        placeholder="Сумма..."
                        min="1"
                        max={remaining}
                        disabled={loading}
                        error={localError}
                    />
                    <Button
                        onClick={handleDeposit}
                        disabled={loading || !depositAmount}
                        loading={loading}
                    >
                        Внести
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default memo(Card)