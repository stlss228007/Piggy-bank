import { API_BASE_URL } from '../../config'

export const apiClient = async (endpoint, options = {}) => {

  const token = localStorage.getItem('access_token')

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ошибка запроса')
  }

  return response.json()
}