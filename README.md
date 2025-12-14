# ☕ JeaLua - Coffee Shop Web Application

> Una plataforma web e-commerce interactiva y responsiva desarrollada para una cafetería moderna, enfocada en la experiencia de usuario (UX) y la persistencia de datos del lado del cliente.

![Status](https://img.shields.io/badge/Status-Completado-success)
![Technology](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20VanillaJS-blue)
![Responsive](https://img.shields.io/badge/Diseño-Responsive-orange)

## 📖 Descripción del Proyecto

**JeaLua** es una aplicación web estática que simula el ecosistema digital completo de una cafetería de especialidad. Este proyecto fue diseñado para demostrar el dominio de los fundamentos del desarrollo web sin depender de frameworks externos. Implementa lógica de negocio real utilizando **JavaScript Vanilla (ES6+)** para manejar estados, carritos de compra persistentes y sistemas de reseñas dinámicos.

El objetivo principal fue construir una arquitectura frontend sólida, modular y totalmente adaptable a dispositivos móviles, optimizando el rendimiento y la accesibilidad.

---

## 🚀 Características Técnicas Destacadas

### 🛒 1. Sistema de Carrito de Compras Persistente
Lógica completa de e-commerce implementada en el cliente:
- **Persistencia de Estado:** Uso de la API `localStorage` para mantener los productos en el carrito incluso si el usuario cierra el navegador o recarga la página.
- **Cálculos en Tiempo Real:** Actualización dinámica de subtotales, costos de envío y totales globales al modificar cantidades.
- **Validación de Checkout:** Lógica condicional para validar campos de dirección solo cuando se selecciona la opción de "Delivery".
- **Sistema de Cupones:** Módulo funcional para validar y aplicar códigos de descuento (ej: `JEALUA10` para 10% off).

### ⭐ 2. Sistema de Reseñas y Calificación
Simulación de base de datos utilizando el almacenamiento local del navegador:
- **Renderizado Dinámico:** Los comentarios se inyectan en el DOM en tiempo real mediante JavaScript.
- **Cálculo de Promedio:** Algoritmo que recalcula la puntuación global (estrellas) basándose en el array de opiniones almacenadas.
- **Validación de Formularios:** Feedback visual inmediato (bordes rojos) si el usuario intenta enviar campos vacíos.
- **Sincronización entre Páginas:** El contador de reseñas en la página de "Contacto" lee la memoria local y se actualiza automáticamente según la data generada en la página de "Comentarios".

### 📱 3. Diseño Responsive (Mobile-First)
- **Grid & Flexbox Avanzado:** Maquetación fluida que se adapta desde pantallas 4K hasta dispositivos móviles pequeños (320px).
- **Componentes Adaptables:** - Tablas de datos con scroll horizontal (`overflow-x`) para evitar romper el layout en móviles.
    - Menú de navegación que se transforma en hamburguesa/off-canvas en resoluciones menores a 991px.
    - Tarjetas flotantes con posicionamiento relativo/absoluto reajustable mediante Media Queries.

### 🎨 4. Interactividad UI/UX
- **Producto Dinámico:** Cambio de imagen principal y precio en tiempo real al seleccionar variantes (ej: Sabor Maracuyá vs Fresa) utilizando atributos `data-` personalizados en el HTML.
- **Micro-interacciones:** Feedback visual en botones al agregar productos y animaciones CSS suaves (`transitions`, `keyframes`) al cargar elementos.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Semántico y estructurado (uso de `<header>`, `<main>`, `<article>`, `<footer>`).
* **CSS3:** Variables CSS (`:root`), Flexbox, CSS Grid, Animaciones, Diseño Responsivo sin frameworks (Bootstrap, Tailwind).
* **JavaScript (Vanilla):** Manipulación del DOM, Event Listeners, JSON parsing/stringifying, Lógica de negocio modular.
* **FontAwesome:** Iconografía vectorial para UI.
* **Google Fonts:** Tipografías *Poppins* y *Playfair Display* para jerarquía visual.

---

## 📂 Estructura del Proyecto

```text
├── index.html          # Página de inicio (Landing Page)
├── menu.html           # Catálogo completo con filtros de ordenamiento
├── carrito.html        # Gestión de compra, totales y checkout
├── comentarios.html    # Sistema de reseñas y calificaciones
├── contacto.html       # Información, mapa y formulario
├── productos/          # Páginas de detalle por producto
│   ├── americano.html
│   ├── capuchino.html
│   ├── cremolada.html
│   └── ...
├── css/
│   └── styles.css      # Hoja de estilos unificada y organizada
├── scripts/
│   └── script.js       # Lógica centralizada (Carrito, UI, Validaciones)
└── img/                # Recursos gráficos optimizados

-----

## 🔧 Instalación y Despliegue

Este proyecto es estático y no requiere dependencias de backend ni instalación de paquetes NPM.

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/jealua-coffee-shop.git](https://github.com/TU_USUARIO/jealua-coffee-shop.git)
    ```
2.  **Ejecutar:**
    Simplemente abre el archivo `index.html` en tu navegador de preferencia o utiliza una extensión como "Live Server" en VS Code para una mejor experiencia de desarrollo.

-----

## 🔮 Mejoras Futuras (Roadmap)

  * [ ] Integración con una API de pasarela de pagos real (Stripe/PayPal).
  * [ ] Migración del almacenamiento de `localStorage` a una base de datos real (Firebase/MongoDB).
  * [ ] Implementación de un panel de administración (Dashboard) para subir nuevos productos dinámicamente.
  * [ ] Modo Oscuro (Dark Mode).

-----

#### Dios, Assembly y la Patria
#### Edrem