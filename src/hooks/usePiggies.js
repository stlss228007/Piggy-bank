import { useState, useEffect, useCallback } from 'react'
import { getAllPiggies, createPiggy } from '../services/piggy'
import { useAsync } from './useAsync'

export const usePiggies = (searchTerm = '') => {
    const [piggies, setPiggies] = useState([])

    const fetchPiggies = useCallback(() => getAllPiggies(searchTerm), [searchTerm])
    const { 
        execute: loadPiggies, 
        loading, 
        error,
        data 
    } = useAsync(fetchPiggies, true)

    useEffect(() => {
        if (!loading && data) {
            const piggiesArray = Array.isArray(data) ? data : []
            setPiggies(piggiesArray)
        }
    }, [loading, data])

    const { 
        execute: create, 
        loading: creating 
    } = useAsync(createPiggy)

    const handleCreate = useCallback(async (formData) => {
        const newPiggy = await create(formData)
        setPiggies(prev => [newPiggy, ...prev])
        return newPiggy
    }, [create])

    const handleDeposit = useCallback((piggyId, amount) => {
        setPiggies(prev => 
            prev.map(piggy => 
                piggy.id === piggyId
                    ? { 
                        ...piggy, 
                        accumulated: piggy.accumulated + amount,
                        updated_at: new Date().toISOString()
                      }
                    : piggy
            )
        )
    }, [])

    return {
        piggies,
        loading,
        error,
        creating,
        handleCreate,
        handleDeposit
    }
}