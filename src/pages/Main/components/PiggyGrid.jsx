import Card from '../../../components/Card/Card'

function PiggyGrid({ piggies, loading, onDeposit }) {
    if (loading) {
        return <div className="loading">Загрузка...</div>
    }

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

export default PiggyGrid