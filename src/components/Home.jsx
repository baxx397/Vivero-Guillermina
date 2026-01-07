import "./Home.css";

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

      {/* SOBRE NOSOTROS */}
      <section className="home-about">
        <h2>Sobre Vivero Guillermina</h2>
        <p>
          Somos un vivero dedicado a acercarte plantas, flores y productos
          naturales para embellecer tus espacios y conectarte con la naturaleza.
        </p>
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
