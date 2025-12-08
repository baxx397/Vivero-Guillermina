import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Login() {
  const { login, isAuthenticated } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(email, password)

    if (!result.success) {
      setError(result.error)
    } else {
      setError('')
      navigate(from, { replace: true })
    }
  }

  return (
    <div
      className="login-container"
      style={{
        textAlign: 'center',
        padding: '40px',
        maxWidth: '400px',
        margin: '50px auto',
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Iniciar sesión</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />

        {error && (
          <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          Iniciar sesión
        </button>
      </form>

      <div
        style={{
          marginTop: '30px',
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #eee',
          textAlign: 'left'
        }}
      >
       <p style={{ fontSize: '14px', marginBottom: '5px' }}>
          <strong>👑 Usuario administrador:</strong><br />
          Email: <code>admin@vivero.com</code><br />
          Contraseña: <code></code>
        </p>
        <hr style={{ margin: '10px 0' }} />
        <hr style={{ margin: '10px 0' }} />
        <p style={{ fontSize: '14px' }}>
          <strong>👤 Usuario de prueba:</strong><br />
          Email: <code>usuario@vivero.com</code><br />
          Contraseña: <code>1234</code>
        </p>
      </div>
    </div>
  )
}
