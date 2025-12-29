import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const API_URL = "https://690a0ff21a446bb9cc213245.mockapi.io/Vivero-Guillermina/products";

// ===== Styled Components =====
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BackLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 10px;
  padding: 6px 12px;
  background-color: #ba09ca;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #5a3d3d54;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 8px;
    line-height: 1.4;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #d656cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: background 0.2s;

  &:hover {
    background-color: #ba09ca;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Error al obtener el producto');
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("❌ Error al traer el producto:", err);
        setError('Producto no encontrado o error al cargar.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProduct, 400);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('🔒 Debes iniciar sesión para agregar productos al carrito.');
      navigate('/login');
      return;
    }

    const cleanPrice = parseFloat(String(product.price).replace(/[^\d.-]/g, ''));
    addToCart({ ...product, price: cleanPrice });
    toast.success(`✅ ${product.name} agregado al carrito!`);
  };

  if (loading) return <p>Cargando detalle...</p>;

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackLink to="/productos">← Volver a productos</BackLink>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <BackLink to="/productos">← Volver</BackLink>
        <Image src={product.image} alt={product.name} />
        <Info>
          <h2>{product.name}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
          <p><strong>Precio:</strong> ${Number(product.price).toLocaleString('es-AR')}</p>
          {product.luz && <p><strong>Luz:</strong> {product.luz}</p>}
          {product.riego && <p><strong>Riego:</strong> {product.riego}</p>}
          {product.cuidados && <p><strong>Cuidados:</strong> {product.cuidados}</p>}
          {product.tamaño && <p><strong>Tamaño:</strong> {product.tamaño}</p>}
          <AddButton onClick={handleAddToCart}>Agregar al carrito</AddButton>
        </Info>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}
