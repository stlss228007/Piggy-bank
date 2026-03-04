/*
import { apiClient } from '../api/client'

export const getAllPiggies = (searchTerm = '') => {
    const query = searchTerm ? `?title=${encodeURIComponent(searchTerm)}` : ''
    return apiClient(`/piggies${query}`)
}
*/

export const getAllPiggies = (searchTerm = '') => {
  
    const allPiggies = [
        { 
            id: '1', 
            title: 'Смерть в нищете', 
            amount: 1000000,
            accumulated: 950000
        },
        { 
            id: '2', 
            title: 'RTX -1 Ti', 
            amount: 999000,
            accumulated: 44444
        },
        { 
            id: '3', 
            title: 'Новый MacBook', 
            amount: 300000,
            accumulated: 250000
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