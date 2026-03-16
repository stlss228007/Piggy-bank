import Input from '../Input/Input'

function AuthInput({ 
    label, 
    name, 
    type = 'text', 
    value, 
    onChange, 
    onBlur, 
    error, 
    touched,
    placeholder,
    disabled 
}) {
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                error={touched && error ? error : ''}
                className="auth-input"
            />
        </div>
    )
}

export default AuthInput