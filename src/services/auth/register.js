import { apiClient } from '../api/client'

export const register = (data) => {
    
  return apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}