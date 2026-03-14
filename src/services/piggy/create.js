import { apiClient } from '../api/client'
import { API } from '../../config/endpoints'

// export const createPiggy = (data) => {
//     return apiClient(API.PIGGIES.BASE, {
//         method: 'POST',
//         body: JSON.stringify(data)
//     })
// }

export const createPiggy = (data) => {    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Date.now().toString(),
                title: data.title,
                amount: data.amount,
                accumulated: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
        }, 500)
    })
}