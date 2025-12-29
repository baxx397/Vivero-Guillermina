import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';

const API_URL = "https://690a0ff21a446bb9cc213245.mockapi.io/Vivero-Guillermina/products";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    category: "",
    name: "",
    description: "",
    price: "",
    image: "",
    luz: "",
    riego: "",
    cuidados: "",
    tamaño: ""
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const formRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 200) {
      setError("La descripción no puede superar los 200 caracteres.");
      return;
    }
    setError("");
    setForm({ ...form, [name]: value });
  };

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        formRef.current.classList.add("form-highlight");
        setTimeout(() => formRef.current.classList.remove("form-highlight"), 1000);
      }, 150);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: isEditing ? "¿Actualizar producto?" : "¿Agregar producto?",
      text: isEditing ? "Estás por modificar este producto." : "Estás por agregar un nuevo producto.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${form.id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Error al guardar el producto");

      Swal.fire({
        icon: "success",
        title: isEditing ? "Producto actualizado" : "Producto agregado",
        timer: 1500,
        showConfirmButton: false
      });

      await fetchProducts();
      resetForm();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar el producto.", "error");
    }
  };

  const handleEdit = async (product) => {
    const result = await Swal.fire({
      title: "¿Editar este producto?",
      text: `Vas a editar ${product.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    setForm(product);
    setIsEditing(true);

    setTimeout(() => scrollToForm(), 150);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        timer: 1500,
        showConfirmButton: false
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar el producto.", "error");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      category: "",
      name: "",
      description: "",
      price: "",
      image: "",
      luz: "",
      riego: "",
      cuidados: "",
      tamaño: ""
    });
    setIsEditing(false);
    setError("");
  };

  // --- FILTRADO POR CATEGORÍA ---
  const filteredProducts = products.filter(p => {
    return selectedCategory === "todas" || p.category === selectedCategory;
  });

  // --- PAGINACIÓN ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="admin-panel">
      <h2>Panel de Administración Leguiza Gastón</h2>
      <p>Gestión de Productos Villa Golf</p>

      {/* FORMULARIO */}
      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Seleccionar categoría</option>
          <option value="Plantas de interior">Plantas de interior</option>
          <option value="Plantas de exterior">Plantas de exterior</option>
        </select>

        <input type="text" name="name" placeholder="Nombre de la planta" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción (máx 200 caracteres)" value={form.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="URL de la imagen" value={form.image} onChange={handleChange} required />
        <input type="text" name="luz" placeholder="Luz" value={form.luz} onChange={handleChange} />
        <input type="text" name="riego" placeholder="Riego" value={form.riego} onChange={handleChange} />
        <input type="text" name="cuidados" placeholder="Cuidados" value={form.cuidados} onChange={handleChange} />
        <input type="text" name="tamaño" placeholder="Tamaño" value={form.tamaño} onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn admin-btn">{isEditing ? "Actualizar producto" : "Agregar producto"}</button>
        {isEditing && <button type="button" onClick={resetForm} className="btn cancel-btn">Cancelar</button>}
      </form>

      {/* BOTONES DE FILTRO DE CATEGORÍA */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        {["todas", "Plantas de interior", "Plantas de exterior"].map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
            style={{
              margin: "5px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: selectedCategory === cat ? "#ba09ca" : "#d656cc",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* LISTADO */}
      <h3>Productos actuales</h3>
      <div className="product-list-admin">
        {currentProducts.length > 0 ? (
          currentProducts.map((p) => (
            <div key={p.id} className="product-item-admin">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              <p><strong>${p.price}</strong></p>

              <div className="admin-actions">
                <button onClick={() => handleEdit(p)} className="btn edit-btn">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="btn delete-btn">Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      {/* PAGINADOR */}
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          « Anterior
        </button>

        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={`pagination-btn ${currentPage === i + 1 ? "active-page" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="pagination-btn"
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente »
        </button>
      </div>
    </div>
  );
}
