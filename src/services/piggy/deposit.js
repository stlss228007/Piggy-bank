import { apiClient } from '../api/client'
import { API } from '../../config/endpoints'

// export const depositMoney = (id, amount) => {
//     return apiClient(API.PIGGIES.DEPOSIT(id), {
//         method: 'POST',
//         body: JSON.stringify({ amount })
//     })
// }

export const depositMoney = (id, amount) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                success: true, 
                message: 'Средства успешно внесены',
                newAccumulated: amount,
                transaction: {
                    id: Date.now().toString(),
                    piggy_id: id,
                    amount: amount,
                    type: 'deposit',
                    created_at: new Date().toISOString()
                }
            })
        }, 500)
    })
}