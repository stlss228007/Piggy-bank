import { apiClient } from '../api/client'
import { API } from '../../config/endpoints'

// export const getPiggyById = (id) => {
//     return apiClient(API.PIGGIES.BY_ID(id))
// }

export const getPiggyById = (id) => {
    const allPiggies = [
        { id: '1', title: 'Смерть в нищете', amount: 1000000, accumulated: 950000 },
        { id: '2', title: 'RTX -1 Ti', amount: 999000, accumulated: 44444 },
        { id: '3', title: 'Новый MacBook', amount: 300000, accumulated: 250000 },
    ]
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const piggy = allPiggies.find(p => p.id === id)
            if (piggy) {
                resolve(piggy)
            } else {
                reject(new Error('Копилка не найдена'))
            }
        }, 300)
    })
}