import './Button.css'

function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    className = '',
    ...props 
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                button 
                button-${variant} 
                button-${size}
                ${fullWidth ? 'button-full-width' : ''}
                ${loading ? 'button-loading' : ''}
                ${className}
            `}
            {...props}
        >
            {loading ? (
                <span className="button-loader"></span>
            ) : children}
        </button>
    )
}

export default Button