import { apiClient } from '../api/client'
import { API } from '../../config/endpoints'

// export const getAllPiggies = (searchTerm = '') => {
//     const query = searchTerm ? API.PIGGIES.WITH_TITLE(searchTerm) : ''
//     return apiClient(`${API.PIGGIES.BASE}${query}`)
// }

export const getAllPiggies = (searchTerm = '') => {
    const allPiggies = [
        { 
            id: '1', 
            title: 'Смерть в нищете', 
            amount: 1000000,
            accumulated: 950000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        { 
            id: '2', 
            title: 'RTX -1 Ti', 
            amount: 999000,
            accumulated: 44444,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        { 
            id: '3', 
            title: 'Новый MacBook', 
            amount: 300000,
            accumulated: 250000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        { 
            id: '4', 
            title: 'Путешествие в Исландию', 
            amount: 500000,
            accumulated: 120000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
    ]

    return new Promise((resolve) => {
        setTimeout(() => {
            if (searchTerm) {
                const filtered = allPiggies.filter(piggy =>
                    piggy.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                resolve(filtered)
            } else {
                resolve(allPiggies)
            }
        }, 500)
    })
}