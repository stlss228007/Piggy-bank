import { useState, useCallback, useEffect } from 'react'

export const useAsync = (asyncFunction, immediate = false) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(immediate)
    const [error, setError] = useState(null)

    const execute = useCallback(async (...args) => {
        setLoading(true)
        setError(null)
        setData(null)

        try {
            const response = await asyncFunction(...args)
            setData(response)
            return response
        } catch (err) {
            setError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }, [asyncFunction])

    useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [execute, immediate])

    const reset = useCallback(() => {
        setData(null)
        setLoading(false)
        setError(null)
    }, [])

    return { execute, data, loading, error, reset }
}