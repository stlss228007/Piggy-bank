import { apiClient } from '../api/client'

export const getPiggyById = (id) => {
    
  return apiClient(`/piggies/${id}`)
}