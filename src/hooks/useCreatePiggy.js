import { useState } from 'react'
import { createPiggy } from '../services/piggy'

export const useCreatePiggy = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const create = async (data) => {
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await createPiggy(data)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { create, loading, error }
}