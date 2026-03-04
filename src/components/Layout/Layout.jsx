import { useState } from 'react'
import './Layout.css'

function Layout({ children }) {

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const username = "123123"

  return (
    <div className="layout">

      <header className="header">
        <div className="header-content">
          
          <h1 className="logo">PiggySave</h1>
          
          <div className="profile-menu">
            <button 
              className="profile-button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <span className="username">{username}</span>
              <span className="dropdown-icon">▼</span>
            </button>
            
            {isProfileMenuOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Личный профиль</button>
                <button className="dropdown-item">Сменить пароль</button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">Выйти из аккаунта</button>
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