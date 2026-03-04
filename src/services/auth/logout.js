import { apiClient } from '../api/client'

export const logout = (data) => {
    
  return apiClient('/auth/logout', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}