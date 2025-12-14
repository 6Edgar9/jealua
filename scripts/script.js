document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================================
    // 1. CONFIGURACIÓN GLOBAL (Se ejecuta en TODAS las páginas)
    // ========================================================================
    
    // a. Inicializar Carrito: Leemos la memoria. Si no hay nada, array vacío.
    let cart = JSON.parse(localStorage.getItem('myJealuaCart')) || [];
    
    // b. Elementos Globales
    const cartCountEl = document.querySelector('.cart-count');

    // --- FUNCIÓN MAESTRA: Guardar y Actualizar Contador ---
    // Esta función es la ÚNICA que debe tocar el localStorage para evitar errores.
    function updateCartState() {
        // 1. Guardar el array de productos
        localStorage.setItem('myJealuaCart', JSON.stringify(cart));

        // 2. Calcular la cantidad total real sumando las cantidades de los productos
        // NO usamos una variable separada, confiamos en el array real.
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        // 3. Actualizar el circulito rojo
        if (cartCountEl) {
            cartCountEl.textContent = totalItems;
            cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    // Ejecutar al inicio para sincronizar (borra "fantasmas" si el array está vacío)
    updateCartState();

    // --- FUNCIÓN GLOBAL: Añadir al Carrito (Lógica de Datos) ---
    // La hacemos accesible globalmente para usarla desde diferentes eventos
    window.addToCartData = function(name, price, image, quantity = 1) {
        quantity = parseInt(quantity) || 1;

        // Buscar si el producto ya existe para no duplicar fila
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                name: name,
                price: parseFloat(price),
                image: image,
                quantity: quantity
            });
        }
        
        updateCartState(); // Guardar y refrescar contador
    };


    // ========================================================================
    // 2. LÓGICA DEL MENÚ (menu.html)
    // ========================================================================
    const sortSelect = document.querySelector('.orderby');
    const menuGrid = document.querySelector('.menu-grid');
    const quickButtons = document.querySelectorAll('.btn-add-quick');

    // A. Filtrado
    if (sortSelect && menuGrid) {
        const originalItems = Array.from(menuGrid.children);

        sortSelect.addEventListener('change', function() {
            const criterio = this.value;
            const itemsActuales = Array.from(menuGrid.children);
            const getPrice = (item) => parseFloat(item.getAttribute('data-price'));

            if (criterio === 'price') {
                itemsActuales.sort((a, b) => getPrice(a) - getPrice(b));
            } else if (criterio === 'price-desc') {
                itemsActuales.sort((a, b) => getPrice(b) - getPrice(a));
            } else {
                menuGrid.innerHTML = '';
                originalItems.forEach(item => menuGrid.appendChild(item));
                return;
            }
            menuGrid.innerHTML = '';
            itemsActuales.forEach(item => menuGrid.appendChild(item));
        });
    }

    // B. Botones Rápidos "Añadir +"
    quickButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const card = this.closest('.menu-item');
            const name = card.querySelector('h3').innerText;
            const price = card.getAttribute('data-price');
            // Intentamos obtener la imagen, si falla usa un placeholder
            const imgEl = card.querySelector('.menu-item-img img');
            const img = imgEl ? imgEl.src : 'img/logo.jpg';

            window.addToCartData(name, price, img, 1);

            // Efecto Visual
            const originalText = this.textContent;
            this.textContent = "✔";
            this.style.backgroundColor = "#28a745";
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = "";
            }, 1000);
        });
    });


    // ========================================================================
    // 3. LÓGICA DE PRODUCTO INDIVIDUAL (ej: americano.html)
    // ========================================================================
    const singleBtn = document.querySelector('.btn-add-cart');
    const sizeSelect = document.getElementById('size-select');
    const priceDisplay = document.getElementById('display-price');

    // A. Cambio de Precio visual E IMAGEN
    if (sizeSelect && priceDisplay) {
        const mainImageEl = document.querySelector('.product-img-full'); // Seleccionamos la imagen principal

        sizeSelect.addEventListener('change', function() {
            // 1. Obtener datos de la opción seleccionada
            const selectedOption = this.options[this.selectedIndex];
            const newPrice = selectedOption.getAttribute('data-price');
            const newImage = selectedOption.getAttribute('data-image'); // Obtenemos la ruta de la nueva imagen
            
            // 2. Actualizar Precio
            if (newPrice) {
                priceDisplay.textContent = 'S/. ' + parseFloat(newPrice).toFixed(2);
                priceDisplay.style.color = '#7D89D1';
                setTimeout(() => priceDisplay.style.color = '', 300);
            }

            // 3. Actualizar Imagen (Con un pequeño efecto de parpadeo suave)
            if (newImage && mainImageEl) {
                mainImageEl.style.opacity = '0.6'; // Bajar opacidad
                setTimeout(() => {
                    mainImageEl.src = newImage; // Cambiar la fuente de la imagen
                    mainImageEl.style.opacity = '1'; // Restaurar opacidad
                }, 200);
            }
        });
    }

    // B. Botón Agregar
    if (singleBtn) {
        singleBtn.addEventListener('click', function() {
            let name = document.querySelector('.product-title').innerText;
            const img = document.querySelector('.product-img-full').src;
            const qtyInput = document.querySelector('.qty-input');
            const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
            let price = 0;

            // Lógica para detectar tamaño y cambiar nombre
            if (sizeSelect) {
                const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
                const sizeName = selectedOption.text; // Ej: "360ml"
                price = parseFloat(selectedOption.getAttribute('data-price'));
                name = `${name} - ${sizeName}`; 
            } else {
                const priceText = document.querySelector('#display-price').innerText;
                price = parseFloat(priceText.replace('S/.', '').trim());
            }

            window.addToCartData(name, price, img, quantity);

            // Efecto Visual
            const originalText = this.textContent;
            this.textContent = "✔ Añadido";
            this.style.backgroundColor = "#28a745";
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = "";
            }, 1000);
        });
    }


    // ========================================================================
    // 4. LÓGICA DE PÁGINA CARRITO (Solo carrito.html)
    // ========================================================================
    const cartTableBody = document.getElementById('cart-items-body');

    // Si existe la tabla, estamos en el carrito
    if (cartTableBody) {
        
        // Elementos DOM Carrito
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total-final');
        const discountRow = document.getElementById('discount-row');
        const discountEl = document.getElementById('cart-discount');
        
        const shippingRadios = document.querySelectorAll('input[name="shipping_option"]');
        const addressBox = document.getElementById('address-box');
        const addressInput = document.getElementById('shipping-address');
        const addressError = document.getElementById('address-error');
        
        const btnCoupon = document.getElementById('apply-coupon-btn');
        const inputCoupon = document.getElementById('coupon-code');
        const msgCoupon = document.getElementById('coupon-message');
        const btnCheckout = document.getElementById('btn-checkout-action');

        // Variables de estado local del carrito
        let currentDiscount = 0;
        let currentShipping = 0;
        
        const validCoupons = {
            'JEALUA10': 0.10, // 10%
            'CAFE20': 0.20,   // 20%
            'GRATIS5': 5.00   // -5 soles
        };

        // --- Función Renderizar Tabla ---
        function renderCartPage() {
            cartTableBody.innerHTML = '';
            let subtotal = 0;

            if (cart.length === 0) {
                cartTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 30px;">Tu carrito está vacío. <a href="menu.html" style="font-weight:bold;">Ir al menú</a></td></tr>';
                if(subtotalEl) subtotalEl.textContent = 'S/. 0.00';
                if(totalEl) totalEl.textContent = 'S/. 0.00';
                return;
            }

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="product-name-col">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="${item.image}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;" onerror="this.style.display='none'">
                            ${item.name}
                        </div>
                    </td>
                    <td>S/. ${item.price.toFixed(2)}</td>
                    <td>
                        <div style="display:inline-flex; border:1px solid #ddd; border-radius:4px;">
                            <button onclick="window.changeQty(${index}, -1)" style="border:none; background:none; padding:5px 10px; cursor:pointer;">-</button>
                            <span style="padding:5px 10px;">${item.quantity}</span>
                            <button onclick="window.changeQty(${index}, 1)" style="border:none; background:none; padding:5px 10px; cursor:pointer;">+</button>
                        </div>
                    </td>
                    <td>S/. ${itemTotal.toFixed(2)}</td>
                    <td><button class="btn-remove" onclick="window.removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer; font-size:1.2rem;">&times;</button></td>
                `;
                cartTableBody.appendChild(row);
            });

            // Cálculos Finales
            let discountValue = 0;
            if (currentDiscount > 0) {
                if (currentDiscount < 1) discountValue = subtotal * currentDiscount;
                else discountValue = currentDiscount;
            }

            const finalTotal = subtotal + currentShipping - discountValue;

            // Actualizar UI Totales
            if(subtotalEl) subtotalEl.textContent = `S/. ${subtotal.toFixed(2)}`;
            
            if (discountRow) {
                if (discountValue > 0) {
                    discountRow.style.display = 'flex';
                    discountEl.textContent = `- S/. ${discountValue.toFixed(2)}`;
                } else {
                    discountRow.style.display = 'none';
                }
            }

            if(totalEl) totalEl.textContent = `S/. ${finalTotal < 0 ? 0 : finalTotal.toFixed(2)}`;
        }

        // --- Eventos Interiores del Carrito ---
        
        // 1. Envío
        shippingRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'delivery') {
                    currentShipping = 10.00;
                    addressBox.style.display = 'block';
                    addressError.style.display = 'none';
                    addressInput.style.borderColor = "";
                } else {
                    currentShipping = 0;
                    addressBox.style.display = 'none';
                }
                renderCartPage();
            });
        });

        // 2. Cupón
        if (btnCoupon) {
            btnCoupon.addEventListener('click', function() {
                const code = inputCoupon.value.trim().toUpperCase();
                msgCoupon.textContent = '';
                msgCoupon.className = '';

                if (!code) {
                    msgCoupon.textContent = '⚠ Ingresa un código.';
                    msgCoupon.style.color = '#ff6b6b';
                    return;
                }

                if (validCoupons.hasOwnProperty(code)) {
                    currentDiscount = validCoupons[code];
                    msgCoupon.textContent = '¡Cupón aplicado!';
                    msgCoupon.style.color = '#28a745';
                    renderCartPage();
                } else {
                    currentDiscount = 0;
                    msgCoupon.textContent = '❌ Cupón inválido.';
                    msgCoupon.style.color = '#ff6b6b';
                    renderCartPage();
                }
            });
        }

        // 3. Checkout
        if (btnCheckout) {
            btnCheckout.addEventListener('click', function() {
                if (cart.length === 0) {
                    alert("Tu carrito está vacío.");
                    return;
                }

                const selectedShipping = document.querySelector('input[name="shipping_option"]:checked').value;

                if (selectedShipping === 'delivery') {
                    if (addressInput.value.trim() === "") {
                        addressError.style.display = 'block';
                        addressInput.style.borderColor = '#ff6b6b';
                        addressInput.focus();
                        return;
                    }
                }

                alert("¡Pedido procesado con éxito!");
                
                // Limpiar carrito tras compra exitosa
                cart = [];
                updateCartState();
                renderCartPage();
            });
        }

        // Inicializar Renderizado
        renderCartPage();

        // --- Funciones Globales para la Tabla (necesarias para onclick="") ---
        window.removeFromCart = function(index) {
            cart.splice(index, 1);
            updateCartState();
            renderCartPage();
        };

        window.changeQty = function(index, change) {
            const item = cart[index];
            const newQty = item.quantity + change;

            if (newQty > 0) {
                item.quantity = newQty;
                updateCartState();
                renderCartPage();
            } else {
                // Si baja a 0, confirmamos borrado
                if (confirm("¿Eliminar producto del carrito?")) {
                    cart.splice(index, 1);
                    updateCartState();
                    renderCartPage();
                }
            }
        };
    }
    
    // --- SCROLL SPY (Historia) ---
    const historyLinks = document.querySelectorAll('.h-link');
    const sections = document.querySelectorAll('.section-block');
    if (historyLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            historyLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // --- MODALES BLOG ---
    const openModalBtns = document.querySelectorAll('.read-more-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if(modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.onclick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // --- FORMULARIO CONTACTO ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const messageDiv = document.getElementById('formMessage');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input');
            let valid = true;
            inputs.forEach(i => {
                if(i.value.trim() === '') valid = false;
            });
            
            if(!valid) {
                messageDiv.style.color = '#d9534f';
                messageDiv.textContent = 'Por favor, completa todos los campos.';
                return;
            }
            
            messageDiv.style.color = '#28a745';
            messageDiv.textContent = 'Enviando...';
            setTimeout(() => {
                messageDiv.textContent = '¡Mensaje enviado con éxito!';
                contactForm.reset();
            }, 1000);
        });
    }

    // ========================================================================
    // 5. LÓGICA DE COMENTARIOS Y CONTACTO (Integración)
    // ========================================================================
    
    // 1. Cargar base de datos de comentarios (Común para ambas páginas)
    let reviews = JSON.parse(localStorage.getItem('jealuaReviews')) || [];
    
    // Si está vacío, cargamos datos de prueba para que se vea bonito
    if (reviews.length === 0) {
        reviews = [
            { name: "Maria L.", rating: 5, text: "¡El mejor café de Chiclayo! El ambiente es increíble.", date: "10/12/2025" },
            { name: "Carlos R.", rating: 5, text: "La atención 10/10. Muy recomendado.", date: "11/12/2025" }
        ];
        localStorage.setItem('jealuaReviews', JSON.stringify(reviews));
    }

    // --- A. PÁGINA DE CONTACTO (Actualizar el contador "Según X Comentarios") ---
    const contactReviewCountEl = document.getElementById('contact-total-reviews');
    if (contactReviewCountEl) {
        contactReviewCountEl.textContent = reviews.length;
    }

    // --- B. PÁGINA DE COMENTARIOS (Formulario y Lista) ---
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
        const reviewsFeed = document.getElementById('reviews-feed');
        const avgScoreEl = document.getElementById('average-score');
        const avgStarsEl = document.getElementById('average-stars');
        const totalReviewsEl = document.getElementById('total-reviews');
        
        const starInputs = document.querySelectorAll('.star-rating-input i');
        const ratingValueInput = document.getElementById('rating-value');
        
        // Elementos de validación
        const nameInput = document.getElementById('reviewer-name');
        const textInput = document.getElementById('reviewer-text');
        const errorMsg = document.getElementById('review-error');

        // Inicializar vista
        renderReviews();
        updateAverage();

        // Lógica Visual de Estrellas (Click)
        starInputs.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                ratingValueInput.value = value;
                updateStarVisuals(value);
            });
        });

        function updateStarVisuals(value) {
            starInputs.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.style.color = '#f1c40f'; // Dorado
                    s.classList.remove('far'); 
                    s.classList.add('fas');    
                } else {
                    s.style.color = '#ddd';    // Gris
                }
            });
        }
        updateStarVisuals(5); // Empezar con 5 estrellas marcadas

        // Envío del Formulario
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar estilos de error
            errorMsg.style.display = 'none';
            nameInput.style.borderBottomColor = '#ccc';
            textInput.style.borderBottomColor = '#ccc';

            const nameVal = nameInput.value.trim();
            const textVal = textInput.value.trim();
            const ratingVal = parseInt(ratingValueInput.value);

            // Validación
            let isValid = true;
            if (nameVal === '') {
                nameInput.style.borderBottomColor = '#d9534f';
                isValid = false;
            }
            if (textVal === '') {
                textInput.style.borderBottomColor = '#d9534f';
                isValid = false;
            }

            if (!isValid) {
                errorMsg.style.display = 'block';
                return;
            }

            // Guardar
            const newReview = { 
                name: nameVal, 
                rating: ratingVal, 
                text: textVal, 
                date: new Date().toLocaleDateString() 
            };
            
            reviews.unshift(newReview); // Agregar al inicio
            localStorage.setItem('jealuaReviews', JSON.stringify(reviews));
            
            // Actualizar vista
            renderReviews();
            updateAverage();
            
            // Resetear form
            reviewForm.reset();
            updateStarVisuals(5);
            alert("¡Gracias por tu comentario!");
        });

        // Funciones de Renderizado
        function renderReviews() {
            reviewsFeed.innerHTML = '';
            reviews.forEach(r => {
                let starsHtml = '';
                for(let i=1; i<=5; i++) {
                    starsHtml += i <= r.rating ? '<i class="fas fa-star" style="color:#f1c40f"></i>' : '<i class="far fa-star" style="color:#ddd"></i>';
                }

                const card = document.createElement('div');
                card.className = 'review-card';
                card.innerHTML = `
                    <div class="review-header">
                        <strong>${r.name}</strong>
                        <div class="stars">${starsHtml}</div>
                    </div>
                    <p>${r.text}</p>
                    <span class="review-date">${r.date}</span>
                `;
                reviewsFeed.appendChild(card);
            });
        }

        function updateAverage() {
            if (reviews.length === 0) return;
            const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
            const avg = (sum / reviews.length).toFixed(1);
            
            if(avgScoreEl) avgScoreEl.textContent = avg;
            if(totalReviewsEl) totalReviewsEl.textContent = reviews.length;

            let starsHtml = '';
            for(let i=1; i<=5; i++) {
                if (i <= Math.round(avg)) starsHtml += '<i class="fas fa-star"></i>';
                else starsHtml += '<i class="far fa-star" style="color:#ccc"></i>';
            }
            if(avgStarsEl) avgStarsEl.innerHTML = starsHtml;
        }
    }

    // ========================================================================
    // 7. MENÚ HAMBURGUESA (MÓVIL)
    // ========================================================================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            // Alternar clase 'active' en el botón y el menú
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }
});