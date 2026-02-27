import './Card.css'

function Card({ title, current, target }) {
  
  const progress = Math.round((current / target) * 100)
  const remaining = target - current

  return (
    <div className="card">
      <div className="card-label">ЦЕЛЬ НАКОПЛЕНИЯ</div>
      <h3 className="card-title">{title}</h3>

      <div className="amounts-row">
        <div className="amount-block">
          <span className="amount-label">Накоплено</span>
          <span className="current-amount">{current.toLocaleString()} ₽</span>
        </div>
        <div className="amount-block">
          <span className="amount-label">Из суммы</span>
          <span className="target-amount">{target.toLocaleString()} ₽</span>
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
        <span className="remaining-amount">Осталось: {remaining.toLocaleString()} ₽</span>
      </div>

      <div className="card-actions">
        <input 
          type="number" 
          placeholder="Сумма..." 
          className="amount-input"
        />
        <button className="deposit-btn">Внести</button>
      </div>
    </div>
  )
}

export default Card