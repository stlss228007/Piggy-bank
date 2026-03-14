import { apiClient } from '../api/client'
import { API } from '../../config/endpoints'

// export const updatePiggy = (id, data) => {
//     return apiClient(API.PIGGIES.BY_ID(id), {
//         method: 'PATCH',
//         body: JSON.stringify(data)
//     })
// }

export const updatePiggy = (id, data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                ...data,
                updated_at: new Date().toISOString()
            })
        }, 300)
    })
}