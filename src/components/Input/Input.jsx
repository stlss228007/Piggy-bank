import './Input.css'

function Input({
    value,
    onChange,
    placeholder,
    type = 'text',
    label,
    error,
    icon,
    disabled = false,
    required = false,
    min,
    max,
    step,
    className = '',
    id,
    ...props
}) {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
        <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                    {required && <span className="input-required">*</span>}
                </label>
            )}
            <div className="input-container">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    className={`input-field ${icon ? 'with-icon' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    )
}

export default Input