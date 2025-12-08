import React, { useContext } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/CartContext'

export default function Cart() {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const { cart, increase, decrease, removeItem } = useContext(CartContext)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (!user) {
      alert('Debes iniciar sesión para continuar con el pago.')
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  if (cart.length === 0)
    return (
      <div className="cart-container">
        <p>El carrito está vacío.</p>
        <button className="btn volver" onClick={() => navigate('/productos')}>
          Volver a productos
        </button>
      </div>
    )

  return (
    <div className="cart-container">
      <h2>Carrito</h2>

      <ul className="cart-list">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 60, height: 60, objectFit: 'cover' }}
            />

            <div>
              <strong>{item.name}</strong>
              <p>Precio unitario: ${item.price}</p>
              <p>
                Cantidad:
                <button className="cart-btn" onClick={() => decrease(item.id)}>
                  <AiOutlineMinus />
                </button>
                {item.quantity}
                <button className="cart-btn" onClick={() => increase(item.id)}>
                  <AiOutlinePlus />
                </button>
              </p>
            </div>

            <div className="cart-item-right">
              <p>${item.price * item.quantity}</p>

              <button
                className="btn eliminar"
                onClick={() => removeItem(item.id)}  // <-- nombre correcto
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>

      <div
        className="cart-buttons"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginTop: '20px'
        }}
      >
        <button className="btn volver" onClick={() => navigate('/productos')}>
          Volver a productos
        </button>
        <button className="btn pagar" onClick={handleCheckout}>
          Total a Pagar
        </button>
      </div>
    </div>
  )
}
