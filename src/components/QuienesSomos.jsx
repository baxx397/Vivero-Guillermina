// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, ShieldCheck, HeartHandshake } from "lucide-react";

export default function QuienesSomos() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      
      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-green-700 to-green-500 text-white py-24 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ¿Quiénes Somos en Vivero Guillermina?
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-[Lora]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          En <strong>Vivero Guillermina</strong>, nos especializamos en el cultivo,
          cuidado y venta de plantas de interior y exterior. Nuestra misión es
          acercar la naturaleza a tu hogar y jardín, aportando bienestar, color
          y frescura a tus espacios con plantas e insumos de la más alta calidad.
        </motion.p>
      </section>

      {/* TARJETAS */}
      <section 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl py-16 px-6"
        aria-label="Información sobre Vivero Guillermina"
      >
        
        {/* EQUIPO */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border hover:shadow-xl transition"
          whileHover={{ scale: 1.03 }}
        >
          <Users className="w-14 h-14 text-green-600 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-3">Nuestro Equipo de Jardinería</h2>
          <p className="text-gray-600 leading-relaxed font-[Lora]">
            Contamos con un equipo profesional y apasionado por las plantas,
            preparado para asesorarte en la elección de especies y en el cuidado
            que cada una necesita para crecer fuerte y saludable.
          </p>
        </motion.div>

        {/* MISIÓN */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border hover:shadow-xl transition"
          whileHover={{ scale: 1.03 }}
        >
          <ShieldCheck className="w-14 h-14 text-green-600 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-3">Nuestra Misión</h2>
          <p className="text-gray-600 leading-relaxed font-[Lora]">
            Nuestro objetivo es ofrecer plantas sanas, insumos de jardinería y
            herramientas que te permitan diseñar tu propio espacio natural,
            fomentando la conexión con la naturaleza y el bienestar personal.
          </p>
        </motion.div>

        {/* VALORES */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border hover:shadow-xl transition"
          whileHover={{ scale: 1.03 }}
        >
          <HeartHandshake className="w-14 h-14 text-green-600 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-3">Nuestros Valores</h2>
          <p className="text-gray-600 leading-relaxed font-[Lora]">
            Promovemos la sostenibilidad, el cuidado del ambiente y la atención
            personalizada. En Vivero Guillermina creemos en una relación cercana
            con cada cliente y en el respeto por la biodiversidad.
          </p>
        </motion.div>

      </section>
    </div>
  );
}
