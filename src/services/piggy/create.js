/*
import { apiClient } from '../api/client'

export const createPiggy = (data) => {

  return apiClient('/piggies', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}
*/

 export const createPiggy = (data) => {
    
    console.log('Создание копилки:', data)
    
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