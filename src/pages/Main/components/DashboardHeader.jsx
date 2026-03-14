import Search from '../../../components/Search/Search'
import Button from '../../../components/Button/Button'

function DashboardHeader({ searchTerm, onSearchChange, loading, onCreateClick }) {
    return (
        <div className="dashboard-header">
            <div className="search-section">
                <Search 
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Поиск по вашим копилкам..."
                />
                
                {loading && (
                    <div className="search-loading">
                        <span className="loading-spinner"></span>
                    </div>
                )}
            </div>
            
            <Button variant="primary" onClick={onCreateClick}>
                + Создать копилку
            </Button>
        </div>
    )
}

export default DashboardHeader