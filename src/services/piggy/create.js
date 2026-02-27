import { apiClient } from '../api/client'

export const createPiggy = (data) => {
  return apiClient('/piggy', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}