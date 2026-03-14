import { useState, useEffect, useRef } from 'react'
import Card from '../../../components/Card/Card'

function PiggyGridWithState({ piggies, loading, onDeposit }) {
    const [showContent, setShowContent] = useState(false)
    const hasLoadedOnce = useRef(false)

    useEffect(() => {        
        if (!loading) {
            if (piggies.length > 0) {
                hasLoadedOnce.current = true
                setShowContent(true)
            }
            
            if (piggies.length === 0) {
                if (hasLoadedOnce.current) {
                    setShowContent(true)
                } else {
                }
            }
        }
    }, [loading, piggies])

    if (loading && !hasLoadedOnce.current) {
        return <div className="loading">Загрузка...</div>
    }

    if (showContent) {
        
        if (piggies.length === 0) {
            return <div className="no-results">Копилки не найдены</div>
        }
        
        return (
            <div className="cards-container">
                {piggies.map(piggy => (
                    <Card 
                        key={piggy.id}
                        id={piggy.id}
                        title={piggy.title}
                        amount={piggy.amount}
                        accumulated={piggy.accumulated}
                        onUpdate={onDeposit}
                    />
                ))}
            </div>
        )
    }

    return null
}

export default PiggyGridWithState