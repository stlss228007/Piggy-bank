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
    const error = await response.json().catch(() => ({ 
      error: 'Ошибка запроса' 
    }))
    throw new Error(error.error || 'Ошибка запроса')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}