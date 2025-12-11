import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Layout from './components/Layout'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './components/Checkout'
import Contacto from "./components/Contacto";// ← 🟢 IMPORTAR CONTACTO
import './App.css'

export default function App() {

  function Home() {
    return (
      <div className="home-container">
        <div className="home-banner">
          <div className="overlay">
            <h1 className="titulo-home">Bienvenido a Vivero Guillermina</h1>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />

            {/* 🟢 Contacto — Público */}
            <Route path="/contacto" element={<Contacto />} />   {/* ← 🟢 NUEVA RUTA */}

            {/* 🛒 Carrito — público */}
            <Route path="/carrito" element={<Cart />} />

            {/* 🔒 Checkout — SOLO con login */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* 🔒 Admin — requiere adminOnly */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<p>404 - No encontrado</p>} />

          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  )
}
