import { memo } from 'react'
import Input from '../Input/Input'
import './Search.css'

const Search = memo(({ value, onChange, placeholder, inputRef }) => {
    return (
        <div className="search-wrapper">
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                icon="🔍"
                className="search-input"
            />
        </div>
    )
})

export default Search