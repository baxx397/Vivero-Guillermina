	
Buenas tardes, mi nombre es Gastón Pablo Leguiza.
A continuación, presento mi trabajo.
Si bien el proyecto está funcional, siempre existen mejoras posibles y planeo continuar desarrollándolo.
Aquí dejo un análisis completo de cómo está construido y qué funcionalidades incorpora.
Deploy
El proyecto está desplegado en Vercel:  https://vivero-guillermina.vercel.app/
Autor
Proyecto React / Front-End
Proyecto Vivero Guillermina
Aplicación web para la venta de plantas de interior y exterior, desarrollada con React y conectada a MockAPI.
Incluye catálogo, buscador, carrito de compras, autenticación de usuarios, panel administrador y diseño responsivo adaptado a celular, tablet y escritorio.

Descripción del Proyecto
Vivero Guillermina es una tienda online diseñada para gestionar productos de un vivero de forma sencilla e intuitiva.
La aplicación permite a los usuarios explorar un catálogo de plantas, ver detalles, agregar productos al carrito y realizar acciones solo si están autenticados.
Además, cuenta con un panel administrativo donde un usuario con rol admin puede agregar, Asignar categoría al producto antes de agregar, editar y eliminar productos vinculados a MockAPI.
El proyecto está desarrollado con React, utilizando Context API para el manejo global del estado, Styled Components, Bootstrap, y herramientas modernas de interfaz como React Toastify y SweetAlert.

Características Principales
Carrito de Compras

Añadir, aumentar, disminuir o eliminar productos del carrito.
Gestión global del estado mediante CartContext.
Alertas con SweetAlert al agregar productos.
Si el usuario no está logueado y quiere agregar un producto, aparece un SweetAlert con la opción de iniciar sesión.
 Autenticación de Usuarios

Manejo con AuthContext.
Login simulado almacenado en localStorage.
Rutas protegidas: solo usuarios autenticados pueden acceder al carrito y al checkout.
Si no está logueado, el usuario es redirigido al login desde Detalle de Producto.
Panel Administrador
Usuario administrador con permisos especiales para:

Agregar nuevos productos
Editar productos existentes
Asigna categoría al producto antes de agregar
Eliminar productos del catálogo
Todo vinculado en tiempo real a MockAPI.
Incluye:
Formularios validados con React
Manejo de errores
SweetAlert para confirmaciones
Paginación propia del panel (diseño con CSS)
Búsqueda y Filtros

Buscador que filtra en tiempo real:Por nombrePor categoríaPor coincidencias generalesRápido, eficiente y totalmente integrado al catálogo.
Paginación

Paginador en la vista de productos con Styled Components.
Paginador independiente en el panel admin con CSS fijo.
Permite navegar cómodamente entre páginas de productos.
Interfaz y Diseño

Styled Components para componentes reutilizables y estilos modulares.
CSS clásico en secciones específicas.
Bootstrap aplicado en el detalle de producto.
React Toastify para notificaciones animadas.
Diseño responsivo para celulares, tablets y escritorio.
Otras funcionalidades

Manejo de carga y errores con MockAPI.
Helmet para mejorar SEO .
Proyecto subido a Vercel y GitHub.
Tecnologías Utilizadas

React
Styled Components
CSS / Bootstrap
React Toastify
SweetAlert
Context API
MockAPI
Vite
Git / GitHub
Vercel
