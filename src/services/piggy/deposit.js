/*
import { apiClient } from '../api/client'

export const depositMoney = (id, amount) => {
  return apiClient(`/piggies/${id}/deposit`, {
    method: 'POST',
    body: JSON.stringify({ amount })
  })
}
*/

export const depositMoney = (id, amount) => {

    console.log(`Внесение ${amount} в копилку ${id}`)
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                success: true, 
                message: 'Средства успешно внесены',
                newAccumulated: amount
            })
        }, 500)
    })
}