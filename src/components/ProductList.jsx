import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/CartContext'
import Swal from 'sweetalert2'

const API_URL = "https://690a0ff21a446bb9cc213245.mockapi.io/Vivero-Guillermina/products"
const ITEMS_PER_PAGE = 8

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("todas")

  // Estado del modal (ZOOM)
  const [zoomImage, setZoomImage] = useState(null)

  const { isAuthenticated } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  const categories = ["todas", "plantas de interior", "plantas de exterior"]

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Error al obtener productos')
        const data = await res.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(fetchData, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: '🔒 Para agregar productos al carrito, necesitas iniciar sesión. ¿Deseas ir al login ahora?',
        showCancelButton: true,
        confirmButtonText: 'Sí, ir al login',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      })
      if (result.isConfirmed) {
        navigate('/login')
      }
      return
    }
    addToCart(product)
    Swal.fire({
      icon: 'success',
      title: `${product.name} agregado al carrito`,
      timer: 1500,
      showConfirmButton: false
    })
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "todas" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <>
      {/* Estilos para paginador redondo */}
      <style>
        {`
        .pagination {
          text-align: center;
          margin: 20px 0;
        }
        .pagination-btn {
          margin: 0 6px;
          padding: 8px 12px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          background: #ecf0f1;
          color: #2c3e50;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          transition: transform .08s, background .12s;
        }
        .pagination-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #dfe6e9;
        }
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .pagination-btn.active {
          background: #27ae60;
          color: white;
        }

        /* Opcional: estilos básicos para product-list y cards si no los tenés */
        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 18px;
          padding: 0 12px;
        }
        .product-card {
          padding: 12px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          text-align: center;
        }
        .product-image {
          width: 100%;
          height: 160px;
          object-fit: contain;
          margin-bottom: 10px;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .product-image:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .card-actions {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 8px;
        }
        .btn {
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          background: #27ae60;
          color: white;
          font-weight: 600;
        }
        `}
      </style>

      {/* Barra de búsqueda */}
      <div className="search-bar" style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Buscar productos por nombre o categoría..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          style={{
            padding: '8px 12px',
            width: '300px',
            maxWidth: '90%',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {/* Filtro por categoría */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setCurrentPage(1) }}
            style={{
              margin: "5px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: selectedCategory === cat ? "#27ae60" : "#bdc3c7",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map(p => (
            <div key={p.id} className="product-card">
              
              {/* IMAGEN CON ZOOM + MANITO */}
              <img
                src={p.image}
                alt={p.name}
                className="product-image"
                style={{ cursor: "pointer" }}
                onClick={() => setZoomImage(p.image)}
              />

              <h3 style={{ margin: '8px 0', fontSize: '16px' }}>{p.name}</h3>
              <p style={{ margin: 0, fontWeight: 700 }}>${p.price}</p>

              <div className="card-actions">
                <Link to={`/productos/${p.id}`} className="btn">Ver detalles</Link>
                <button className="btn" onClick={() => handleAddToCart(p)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">🔍 No se encontraron productos</p>
        )}
      </div>

      {/* Paginador redondo (igual que el original) */}
      {totalPages > 1 && (
        <div className="pagination" style={{ textAlign: 'center', margin: '20px 0' }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            « Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Siguiente »
          </button>
        </div>
      )}

      {/* MODAL DE ZOOM */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-in-out",
            cursor: "zoom-out"
          }}
        >
          {/* Botón de cerrar */}
          <button
            onClick={() => setZoomImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "30px",
              color: "white",
              background: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            ❌
          </button>

          <img
            src={zoomImage}
            alt="zoom"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 30px rgba(255,255,255,0.3)",
              animation: "zoomIn 0.25s ease"
            }}
          />
        </div>
      )}

      {/* Animaciones del modal */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from { transform: scale(0.7); opacity: 0.4; }
          to { transform: scale(1); opacity: 1; }
        }
      `}
      </style>
    </>
  )
}
