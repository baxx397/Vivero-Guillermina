import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'

export default function Checkout() {
  const navigate = useNavigate()

  const { clearCart, cart } = useContext(CartContext)

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const handleFinish = () => {
    clearCart() // Vaciar carrito desde el contexto 💥
    alert('✅ ¡Compra realizada con éxito! Gracias por confiar en Vivero Guillermina 🌿')
    navigate('/')
  }

  return (
    <div className="checkout-container" style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Confirmar compra</h2>

      <h3 style={{ marginBottom: '20px' }}>
        Total a pagar: <strong>${total}</strong>
      </h3>

      <p>Elegí tu método de pago para finalizar la compra:</p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          marginTop: '30px'
        }}
      >
        <button
          onClick={handleFinish}
          style={{
            backgroundColor: '#009EE3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            width: '300px'
          }}
        >
          💳 Pagar con Mercado Pago
        </button>

        <button
          onClick={handleFinish}
          style={{
            backgroundColor: '#00C853',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            width: '300px'
          }}
        >
          💳 Pagar con Modo
        </button>
      </div>

      <p style={{ marginTop: '30px', color: '#666' }}>Simulación de pago.</p>
    </div>
  )
}
