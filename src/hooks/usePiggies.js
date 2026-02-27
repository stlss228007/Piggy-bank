import { useState, useEffect } from 'react'
import { getAllPiggies } from '../services/piggy'

export const usePiggies = () => {
  
  const [piggies, setPiggies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllPiggies()
      .then(data => {
        setPiggies(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])
  
  return { piggies, loading, error }
}