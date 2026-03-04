import { memo } from 'react'
import './Search.css'

function Search({ value, onChange, placeholder, inputRef }) {
    
    console.log('Search рендерится')
    
    return (
        <div className="search-wrapper">
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
                id="search-input"
            />
            <label htmlFor="search-input" className="search-icon">🔍</label>
        </div>
    )
}

function areEqual(prevProps, nextProps) {
    return (
        prevProps.value === nextProps.value &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.inputRef === nextProps.inputRef
    )
}

export default memo(Search, areEqual)