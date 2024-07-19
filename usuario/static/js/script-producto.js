document.addEventListener('DOMContentLoaded', function() {
    const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
    const carritoButton = document.querySelector('.carrito');
    const modalCarrito = document.getElementById('modalCarrito');
    const pagarBtn = document.getElementById('pagar-btn');
    const carritoVacioMensaje = document.getElementById('carrito-vacio');
    let contadorCarrito = 0;
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const contador = 0;

    agregarCarritoButtons.forEach(button => {
        console.log('1')
        button.addEventListener('click', () => {
            console.log('2')
            const productoId = button.parentNode.querySelector('h6:first-of-type').textContent; // Use product name as unique ID
            const productoNombre = button.parentNode.querySelector('h6:first-of-type').textContent;
            const productoDescripcion = button.parentNode.querySelector('p:first-of-type').textContent;
            const productoPrecio = button.parentNode.querySelector('p:nth-of-type(2)').textContent;
            /*const productoImagenSrc = button.parentNode.querySelector('img').getAttribute('src'); */

            if (carrito[productoId]) {
                carrito[productoId].cantidad++;
            } else {
                carrito[productoId] = {
                    nombre: productoNombre,
                    descripcion: productoDescripcion,
                    precio: productoPrecio,
                    /*imagenSrc: productoImagenSrc, */
                    cantidad: 1
                };
                contadorCarrito++;
            }

            carritoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;"><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg> ${contadorCarrito}`;

            alert(`Se agregó "${productoNombre}" al carrito`);

            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        });
    });

    function actualizarCarrito() {
        const modalBody = modalCarrito.querySelector('.modal-body');
        const productosList = modalBody.querySelector('.productos');
        productosList.innerHTML = '';

        const carritoVacio = Object.keys(carrito).length === 0;
        carritoVacioMensaje.style.display = carritoVacio ? 'block' : 'none';
        pagarBtn.disabled = carritoVacio;

        for (const id in carrito) {
            const producto = carrito[id];
            const nuevoProducto = document.createElement('li');
            nuevoProducto.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <p>${producto.nombre} - ${producto.precio}</p>
                        <div class="quantity-controls">
                            <button class="decrease-quantity btn-circle btn-blue" data-id="${id}">-</button>
                            <span class="quantity">${producto.cantidad}</span>
                            <button class="increase-quantity btn-circle btn-blue" data-id="${id}">+</button>
                        </div>
                    </div>
                    <div>
                        <!--<img src="${producto.imagenSrc}" class="d-block mx-auto plush" height="100px" alt="..."> -->
                    </div>
                </div>
            `;
            productosList.appendChild(nuevoProducto);

            // Add event listeners for the quantity buttons
            nuevoProducto.querySelector('.increase-quantity').addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                carrito[id].cantidad++;
                actualizarCarrito();
                guardarCarritoEnLocalStorage();
            });

            nuevoProducto.querySelector('.decrease-quantity').addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (carrito[id].cantidad > 1) {
                    carrito[id].cantidad--;
                } else {
                    delete carrito[id];
                    contadorCarrito--;
                }
                actualizarCarrito();
                guardarCarritoEnLocalStorage();
            });
        }
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    const vaciarCarritoButton = document.querySelector('.modal-footer .btn-secondary');
    vaciarCarritoButton.addEventListener('click', () => {
        contadorCarrito = 0;
        carritoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;"><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>`;
        const modalBody = modalCarrito.querySelector('.modal-body');
        modalBody.querySelector('.productos').innerHTML = '';
        Object.keys(carrito).forEach(id => delete carrito[id]);
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    });

    actualizarCarrito(); // Load the existing carrito from localStorage on page load
});