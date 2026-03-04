import { apiClient } from '../api/client'

export const refresh = (data) => {
    
  return apiClient('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}