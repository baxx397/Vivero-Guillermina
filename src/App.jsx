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
import Contacto from "./components/Contacto"
import QuienesSomos from "./components/QuienesSomos"
import Home from "./components/Home"

import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/carrito" element={<Cart />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

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
