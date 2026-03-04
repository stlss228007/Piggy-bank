import { useState, useEffect, useCallback, useRef } from 'react'
import { getAllPiggies, createPiggy } from '../../services/piggy'
import Card from '../../components/Card/Card'
import Search from '../../components/Search/Search'
import Modal from '../../components/Modal/Modal'
import CreatePiggyForm from '../../components/CreatePiggyForm/CreatePiggyForm'
import piggyImage from '../../assets/images/piggy-bank.png'
import './Main.css'

function Dashboard() {

    const [piggies, setPiggies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [initialLoading, setInitialLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const searchInputRef = useRef(null)

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [searchTerm])

    const handleSearchChange = useCallback((term) => {
        setSearchTerm(term)
    }, [])

    const handlePiggyUpdate = useCallback((updatedPiggyId, addedAmount) => {
        setPiggies(prevPiggies => 
            prevPiggies.map(piggy => 
                piggy.id === updatedPiggyId
                    ? { 
                        ...piggy, 
                        accumulated: piggy.accumulated + addedAmount 
                      }
                    : piggy
            )
        )
    }, [])

    const handleCreatePiggy = async (formData) => {
        try {
            const newPiggy = await createPiggy(formData)
            
            setPiggies(prev => [newPiggy, ...prev])
            
            setIsModalOpen(false)
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await getAllPiggies(searchTerm)
                setPiggies(data)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
                setInitialLoading(false)
            }
        }

        fetchData()
    }, [searchTerm])

    if (initialLoading) {
        return <div className="loading">Загрузка...</div>
    }
    
    if (error) return <div className="error">Ошибка: {error}</div>

    return (
        <div className="dashboard">
            <div className="dashboard-header">

                <div className="search-section">

                    <Search 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Поиск по вашим копилкам..."
                        inputRef={searchInputRef}
                    />
                    
                    {loading && (
                        <div className="search-loading">
                            <span className="loading-spinner"></span>
                        </div>
                    )}
                </div>
                
                <button 
                    className="create-button"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Создать копилку
                </button>

            </div>

            {piggies.length === 0 && !loading ? (
                <div className="no-results">Копилки не найдены</div>
            ) : (
                <div className="cards-container">
                    {piggies.map(piggy => (
                        <Card 
                            key={piggy.id}
                            id={piggy.id}
                            title={piggy.title}
                            amount={piggy.amount}
                            accumulated={piggy.accumulated}
                            onUpdate={handlePiggyUpdate}
                        />
                    ))}
                </div>
            )}

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Новая цель"
                image={piggyImage}
            >
                <CreatePiggyForm 
                    onSubmit={handleCreatePiggy}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    )
}

export default Dashboard