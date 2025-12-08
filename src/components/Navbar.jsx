import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/CartContext'   

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)           
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)  

  return (
    <nav className="navbar">
      <div className="brand">
        <NavLink to="/">Vivero Guillermina</NavLink>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Inicio
          </NavLink>
        </li>

        <li>
          <NavLink to="/productos" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Productos
          </NavLink>
        </li>

        {/* 👇 Contacto agregado antes de Login */}
        <li>
          <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Contacto
          </NavLink>
        </li>

        {isAuthenticated && (
          <li>
            <NavLink to="/carrito" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Carrito 🛒 {cartCount > 0 && <span>({cartCount})</span>}
            </NavLink>
          </li>
        )}

        {isAuthenticated && user?.role === 'admin' && (
          <li>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Admin
            </NavLink>
          </li>
        )}

        {!isAuthenticated ? (
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <button className="link-button" onClick={handleLogout}>
              Cerrar sesión ({user?.role})
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
