# ☕ JeaLua — Coffee Shop Web Application

> Plataforma web e-commerce interactiva y responsiva desarrollada para una cafetería moderna, enfocada en la experiencia de usuario (UX) y la persistencia de datos del lado del cliente.

![Status](https://img.shields.io/badge/Status-Completado-success)
![Technology](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20VanillaJS-blue)
![Responsive](https://img.shields.io/badge/Diseño-Responsive-orange)

---

## 📖 Descripción del Proyecto

**JeaLua** es una aplicación web estática que simula el ecosistema digital completo de una cafetería de especialidad. El proyecto fue diseñado para demostrar el dominio de los fundamentos del desarrollo web sin depender de frameworks externos.

Implementa lógica de negocio real utilizando **JavaScript Vanilla (ES6+)** para manejar estados, carritos de compra persistentes y sistemas de reseñas dinámicos.

El objetivo principal fue construir una arquitectura frontend sólida, modular y totalmente adaptable a dispositivos móviles, optimizando el rendimiento y la accesibilidad.

---

## 🚀 Características Técnicas Destacadas

### 🛒 1. Sistema de Carrito de Compras Persistente

Lógica completa de e-commerce implementada en el cliente:

* **Persistencia de estado:** uso de la API `localStorage` para mantener los productos en el carrito incluso si el usuario cierra el navegador o recarga la página.
* **Cálculos en tiempo real:** actualización dinámica de subtotales, costos de envío y totales globales al modificar cantidades.
* **Validación de checkout:** lógica condicional para validar campos de dirección solo cuando se selecciona la opción *Delivery*.
* **Sistema de cupones:** módulo funcional para validar y aplicar códigos de descuento (ej.: `JEALUA10` para 10% OFF).

### ⭐ 2. Sistema de Reseñas y Calificación

Simulación de base de datos utilizando el almacenamiento local del navegador:

* **Renderizado dinámico:** los comentarios se inyectan en el DOM en tiempo real mediante JavaScript.
* **Cálculo de promedio:** algoritmo que recalcula la puntuación global (estrellas) basándose en el array de opiniones almacenadas.
* **Validación de formularios:** feedback visual inmediato (bordes rojos) si el usuario intenta enviar campos vacíos.
* **Sincronización entre páginas:** el contador de reseñas en la página *Contacto* lee la memoria local y se actualiza automáticamente según la data generada en la página *Comentarios*.

### 📱 3. Diseño Responsive (Mobile-First)

* **Grid & Flexbox avanzado:** maquetación fluida que se adapta desde pantallas 4K hasta dispositivos móviles pequeños (320px).
* **Componentes adaptables:**

  * Tablas de datos con scroll horizontal (`overflow-x`) para evitar romper el layout en móviles.
  * Menú de navegación que se transforma en hamburguesa/off-canvas en resoluciones menores a 991px.
  * Tarjetas flotantes con posicionamiento relativo/absoluto reajustable mediante *media queries*.

### 🎨 4. Interactividad UI/UX

* **Producto dinámico:** cambio de imagen principal y precio en tiempo real al seleccionar variantes (ej.: sabor maracuyá vs. fresa) utilizando atributos personalizados `data-*` en el HTML.
* **Microinteracciones:** feedback visual en botones al agregar productos y animaciones CSS suaves (`transitions`, `keyframes`) al cargar elementos.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** marcado semántico y estructurado (`<header>`, `<main>`, `<article>`, `<footer>`).
* **CSS3:** variables CSS (`:root`), Flexbox, CSS Grid, animaciones y diseño responsivo sin frameworks (Bootstrap, Tailwind).
* **JavaScript (Vanilla):** manipulación del DOM, *event listeners*, parsing de JSON, lógica de negocio modular.
* **Font Awesome:** iconografía vectorial para la interfaz.
* **Google Fonts:** tipografías *Poppins* y *Playfair Display* para jerarquía visual.

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
│   └── script.js       # Lógica centralizada (carrito, UI, validaciones)
└── img/                # Recursos gráficos optimizados
```

---

## 🔧 Instalación y Despliegue

Este proyecto es estático y no requiere backend ni dependencias NPM.

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/TU_USUARIO/jealua-coffee-shop.git
   ```
2. **Ejecutar:**
   Abre el archivo `index.html` en tu navegador o utiliza una extensión como **Live Server** en VS Code para una mejor experiencia de desarrollo.

---

## 🔮 Mejoras Futuras (Roadmap)

* [ ] Integración con una API de pasarela de pagos real (Stripe / PayPal).
* [ ] Migración del almacenamiento de `localStorage` a una base de datos real (Firebase / MongoDB).
* [ ] Implementación de un panel de administración (dashboard) para subir nuevos productos dinámicamente.
* [ ] Modo oscuro (*Dark Mode*).

---

#### Dios, Assembly y la Patria
#### Edrem
