import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO */}
      <section className="home-banner">
        <div className="overlay">
          <h1>Vivero Guillermina</h1>
          <p>Plantas, flores y naturaleza para tu hogar</p>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="home-destacados">
        <div className="destacado-card">
          <h3>🌿 Plantas de interior</h3>
          <p>Ideales para darle vida a tus ambientes.</p>
        </div>
        <div className="destacado-card">
          <h3>🌸 Plantas de exterior</h3>
          <p>Perfectas para jardines, patios y balcones.</p>
        </div>
      </section>

      {/* CTA PRODUCTOS */}
      <section className="hero">
        <button
          className="btn-primary"
          onClick={() => navigate("/productos")}
        >
          Ver productos
        </button>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="home-quienes-somos">
        <h2>¿Quiénes somos?</h2>
        <p>
          Somos el Vivero Guillermina, dedicados a ofrecerte plantas, flores y
          productos naturales de calidad.
        </p>
        <NavLink to="/quienes-somos" className="cta-button">
          Ver más
        </NavLink>
      </section>

      {/* CTA INSTAGRAM */}
      <section className="home-cta">
        <h2>Seguinos y conocé más</h2>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Ver Instagram 🌸
        </a>
      </section>

    </div>
  );
}
