import { useState } from 'react'
import { usePiggies } from '../../hooks/usePiggies'
import DashboardHeader from './components/DashboardHeader'
import PiggyGridWithState from './components/PiggyGridWithState'
import CreatePiggyModal from './components/CreatePiggyModal'
import './Main.css'

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const { 
        piggies, 
        loading, 
        error, 
        creating,
        handleCreate, 
        handleDeposit 
    } = usePiggies(searchTerm)

    const handleCreatePiggy = async (formData) => {
        try {
            await handleCreate(formData)
        } catch (error) {
            console.error('Error creating piggy:', error)
            throw error
        }
    }

    if (error) {
        return (
            <div className="dashboard">
                <DashboardHeader 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    loading={loading}
                    onCreateClick={() => setIsModalOpen(true)}
                />
                <div className="error-message">
                    Ошибка: {error}
                    <button onClick={() => window.location.reload()}>
                        Обновить страницу
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <DashboardHeader 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                loading={loading}
                onCreateClick={() => setIsModalOpen(true)}
            />

            <PiggyGridWithState 
                piggies={piggies}
                loading={loading}
                onDeposit={handleDeposit}
            />

            <CreatePiggyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreatePiggy}
                isCreating={creating}
            />
        </div>
    )
}

export default Dashboard