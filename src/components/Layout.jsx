import React, { useContext } from 'react'
import Navbar from './Navbar'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children, setCart }) {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setCart([])          // ✅ vacía el carrito
    navigate('/')        // ✅ redirige al inicio
  }

  return (
    <div className="app-container">
      <Navbar onLogout={handleLogout} />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>Vivero Guillermina © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
