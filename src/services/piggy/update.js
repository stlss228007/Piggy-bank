import { apiClient } from '../api/client'

export const updatePiggy = (id, data) => {
  
  return apiClient(`/piggies/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}