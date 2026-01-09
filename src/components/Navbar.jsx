import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/CartContext'
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="navbar">
      <div className="brand">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Vivero Guillermina
        </NavLink>
      </div>

      {/* Botón hamburguesa */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Inicio
          </NavLink>
        </li>

        <li>
          <NavLink to="/productos" onClick={() => setMenuOpen(false)}>
            Productos
          </NavLink>
        </li>

        <li>
          <NavLink to="/contacto" onClick={() => setMenuOpen(false)}>
            Contacto
          </NavLink>
        </li>

        {isAuthenticated && (
          <li>
            <NavLink to="/carrito" onClick={() => setMenuOpen(false)}>
              Carrito 🛒 {cartCount > 0 && <span>({cartCount})</span>}
            </NavLink>
          </li>
        )}

        {isAuthenticated && user?.role === 'admin' && (
          <li>
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
          </li>
        )}

        {!isAuthenticated ? (
          <li>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <button className="link-button" onClick={handleLogout}>
              Salir ({user?.role})
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
