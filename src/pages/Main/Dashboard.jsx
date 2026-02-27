import { useState } from 'react'
import { usePiggies } from '../../hooks/usePiggies'
import Card from '../../components/Card/Card'
import './Main.css'

function Dashboard() {

  const { piggies, loading, error } = usePiggies()
  const [searchTerm, setSearchTerm] = useState('')
  const filteredPiggies = piggies.filter(piggy =>
    piggy.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="loading">Загрузка...</div>
  if (error) return <div className="error">Ошибка: {error}</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Поиск по вашим копилкам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <button className="create-button">+ Создать копилку</button>
      </div>

      <div className="cards-container">
        {filteredPiggies.map(piggy => (
          <Card 
            key={piggy.id}
            title={piggy.title}
            current={piggy.current}
            target={piggy.target}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard