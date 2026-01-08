import "./Home.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">

      {/* HERO / BANNER */}
      <section className="home-banner">
        <div className="overlay">
          <h1>Vivero Guillermina</h1>
          <p>Plantas, flores y naturaleza para tu hogar</p>
        </div>
      </section>

 

      {/* QUIÉNES SOMOS */}
      <section className="home-quienes-somos">
        <h2>¿Quiénes somos?</h2>
        <p>Somos el Vivero Guillermina, dedicados a ofrecerte plantas, flores y productos naturales de calidad.</p>
        <NavLink to="/quienes-somos" className="cta-button">
          Ver más
        </NavLink>
      </section>

      {/* CTA / INSTAGRAM */}
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
