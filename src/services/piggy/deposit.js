import { apiClient } from '../api/client'

export const deposit = (id, amount) => {
  return apiClient(`/piggy/${id}/deposit`, {
    method: 'POST',
    body: JSON.stringify({ amount }),
  })
}