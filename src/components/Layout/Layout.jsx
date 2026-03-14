import { useState, useEffect, useRef } from 'react'
import Button from '../Button/Button'
import './Layout.css'

function Layout({ children }) {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const username = "123123"

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isProfileMenuOpen])

    return (
        <div className="layout">
            <header className="header">
                <div className="header-content">
                    <h1 className="logo">
                        <a href="/">PiggySave</a>
                    </h1>
                    
                    <div className="profile-menu" ref={menuRef}>
                        <Button 
                            variant="secondary"
                            size="small"
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="profile-button"
                        >
                            <span className="username">{username}</span>
                            <span className="dropdown-icon">▼</span>
                        </Button>
                        
                        {isProfileMenuOpen && (
                            <div className="dropdown-menu">
                                <Button 
                                    variant="secondary" 
                                    fullWidth
                                >
                                    Личный профиль
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    fullWidth
                                >
                                    Сменить пароль
                                </Button>
                                <div className="dropdown-divider"></div>
                                <Button 
                                    variant="danger" 
                                    fullWidth
                                >
                                    Выйти из аккаунта
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>
        </div>
    )
}

export default Layout