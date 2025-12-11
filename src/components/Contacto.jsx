import Swal from "sweetalert2";

export default function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "¡Mensaje enviado!",
      text: "Gracias por contactarnos. Te responderemos a la brevedad.",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });

    e.target.reset(); // opcional: limpia el form
  };

  return (
    <div className="contacto-container">
      <h1>Contáctanos</h1>

      <section className="contacto-section">
        <h2>Información de contacto</h2>
        <p><strong>Email:</strong> viveroguillermina@gmail.com</p>
        <p><strong>Teléfono:</strong> +54 11 1234 5678</p>
        <p><strong>Ubicación:</strong> Calle La Rioja, Buenos Aires, Argentina</p>
      </section>

      <section className="contacto-section">
        <h2>Envíanos un mensaje</h2>

        <form className="contacto-form" onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" />

          <label>Email</label>
          <input type="email" placeholder="Tu email" />

          <label>Mensaje</label>
          <textarea placeholder="Escribe tu mensaje..."></textarea>

          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
