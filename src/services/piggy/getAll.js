/*import { apiClient } from '../api/client'

export const getAllPiggies = () => {
  return apiClient('/piggy')
}*/

// services/piggy/getAll.js
export const getAllPiggies = () => {
  return Promise.resolve([
    { 
      id: 1, 
      title: 'Смерть в нищете', 
      current: 950000, 
      target: 1000000 
    },
    { 
      id: 2, 
      title: 'RTX -1 Ti', 
      current: 44444, 
      target: 999000 
    },
    { 
      id: 3, 
      title: 'Новый MacBook', 
      current: 250000, 
      target: 300000 
    }
  ])
}