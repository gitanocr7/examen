$(document).ready(function(){
    
    //función aparecer al hacer scroll
    window.onscroll = function(){mifuncion()};
    var contenedorCard = document.getElementById("contenedorCard");
    var distanciaContenedorCard;
    function mifuncion(){
        distanciaContenedorCard = window.innerHeight - contenedorCard.getBoundingClientRect().top;
        if(distanciaContenedorCard >= 200){
            contenedorCard.classList.add("contenedorCard_efecto")
        }
    }; 

    //función llamar api

    $.get("https://rickandmortyapi.com/api/character",function(data){
        $.each(data.results,function(i,item){
            $("#modalApi-body").append("<div class='container'"+
                "<div class='row'"+
                "<div class='col-sm-6 col-md-4 col-lg-2'"+
                "<div class='card' style='width: 18rem;'>"+
                "<img src='"+item.image+"' class='card-img-top' alt='...'>"+
                "<div class='card-body'>"+
                "<h5 class='card-title'>"+item.name+"</h5>"+
                "<p class='card-text'>"+item.status+"</p>"+
                "<a href='#' class='btn btn-primary'>Go somewhere</a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>")
        })
    })

    //función cambiar imagen al tener mouse sobre imagen
    $("#img-card-pc-1").on( "mouseenter", function() {
        $(this).attr('src','../media/imagen compu 4.jpg');
    } ).on( "mouseleave", function() {   
        $(this).attr('src','../media/imagen compu 1.jpg');
    })

    $("#img-card-pc-2").on( "mouseenter", function() {
        $(this).attr('src','../media/imagen compu 5.jpg');
    } ).on( "mouseleave", function() {
        $(this).attr('src','../media/imagen compu 2.jpg');
    })

    $("#img-card-pc-3").on( "mouseenter", function() {
        $(this).attr('src','../media/imagen compu 6.jpg');
    } ).on( "mouseleave", function() {
        $(this).attr('src','../media/imagen compu 3.jpg');
    })


    $("#img-card-comp-1").on( "mouseenter", function() {
        $(this).attr('src','../media/tarjeta video 3050.jpg');
    } ).on( "mouseleave", function() {
        $(this).attr('src','../media/ssd pc.png');
    })

    $("#img-card-comp-2").on( "mouseenter", function() {
        $(this).attr('src','../media/tarjeta video 1030.jpg');
    } ).on( "mouseleave", function() {
        $(this).attr('src','../media/procesador.jpg');
    })

    $("#img-card-comp-3").on( "mouseenter", function() {
        $(this).attr('src','../media/refrigeracion liquida.png');
    } ).on( "mouseleave", function() {
        $(this).attr('src','../media/ram pc.jpg');
    })

    
//funciones checkout


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
            const productoId = contador ++;
            console.log('2')
            const productoNombre = button.parentNode.querySelector('h6:first-of-type').textContent;
            const productoDescripcion = button.parentNode.querySelector('p:first-of-type').textContent;
            /*const productoImagenSrc = button.parentNode.querySelector('img').getAttribute('src'); */

            if (carrito[productoId]) {
                carrito[productoId].cantidad++;
            } else {
                carrito[productoId] = {
                    nombre: productoNombre,
                    descripcion: productoDescripcion,
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
                        <p>${producto.nombre} - ${producto.descripcion}</p>
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
        const membresiaSeleccionada = JSON.parse(localStorage.getItem('membresiaSeleccionada'));

        if (membresiaSeleccionada) {
            const nombreMembresia = membresiaSeleccionada.nombre;
            const precioMembresia = parseFloat(membresiaSeleccionada.precio);

            const formatearPrecio = (precio) => {
                return precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
            };

            const actualizarResumen = (precio) => {
                const impuesto = precio * 0.19;
                const total = precio + impuesto;

                document.getElementById('precioMembresia').textContent = formatearPrecio(precio);
                document.getElementById('impuesto').textContent = formatearPrecio(impuesto);
                document.getElementById('totalPagar').textContent = formatearPrecio(total);
            };

            document.getElementById('nombreMembresia').textContent = nombreMembresia;
            document.getElementById('precioMensual').textContent = formatearPrecio(precioMembresia);
            document.getElementById('precioAnual').textContent = formatearPrecio(precioMembresia * 12 * 0.8);

            // Set default prices (Monthly as default)
            actualizarResumen(precioMembresia);

            // Add event listeners to the radio buttons
            const radios = document.querySelectorAll('input[name="tipoPago"]');
            radios.forEach(radio => {
                radio.addEventListener('change', (event) => {
                    if (event.target.value === 'mensual') {
                        actualizarResumen(precioMembresia);
                    } else if (event.target.value === 'anual') {
                        actualizarResumen(precioMembresia * 12 * 0.8);
                    }
                });
            });
        }
});


    //OCULTAR DATOS TARJETA
    document.addEventListener("DOMContentLoaded", function() {
        // Obtener los elementos relevantes
        const tarjetaDiv = document.getElementById("tarjetaDiv");
        const paypalDiv = document.getElementById("paypalDiv");
        const tarjetaRadio = document.getElementById("tarjeta");
        const paypalRadio = document.getElementById("paypal");
        const datosTarjetaContainer = document.getElementById("datosTarjetaContainer");

        // Mostrar u ocultar campos de la tarjeta según el método de pago seleccionado
        function toggleTarjetaFields() {
            if (tarjetaRadio.checked) {
                datosTarjetaContainer.classList.remove("hidden");
            } else {
                datosTarjetaContainer.classList.add("hidden");
            }
        }

        // Llamar a la función para mostrar los campos de la tarjeta al cargar la página
        toggleTarjetaFields();

        // Agregar listeners de eventos para cambiar entre métodos de pago al hacer clic en los divs
        tarjetaDiv.addEventListener("click", function() {
            tarjetaRadio.checked = true;
            toggleTarjetaFields();
        });

        paypalDiv.addEventListener("click", function() {
            paypalRadio.checked = true;
            toggleTarjetaFields();
        });
    });


    //VALIDACIONES
    document.addEventListener('DOMContentLoaded', function() {
        function formatCVV(input) {
            input.value = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
            var formattedValue = input.value.substring(0, 3); // Restringir la longitud a 3 caracteres
            input.value = formattedValue;
        }

        function formatExpiry(input) {
            var formattedValue = input.value.replace(/\D/g, '').substring(0, 4);
            if (formattedValue.length === 4) {
                formattedValue = formattedValue.replace(/^(\d{2})(\d{2})$/, '$1/$2');
            }
            input.value = formattedValue;
        }

        function validarFecha(input) {
            if (input.length === 4) {
                input = input.replace(/^(\d{2})(\d{2})$/, '$1/$2');
            }

            var pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-9][0-9])$/;

            if (!pattern.test(input)) {
                return false;
            }

            var parts = input.split('/');
            var month = parseInt(parts[0], 10);
            var year = parseInt(parts[1], 10); 

            var currentYearLastTwoDigits = parseInt(String(new Date().getFullYear()).slice(-2));

            return (month >= 1 && month <= 12) && (year >= currentYearLastTwoDigits && year <= 99);
        }

        function formatNombre(input) {
            input.value = input.value.toUpperCase().replace(/[^A-Z\s]/g, ''); // Convertir a mayúsculas y eliminar caracteres no alfabéticos
        }

        function validarNombre(input) {
            return input.length >= 9; // Validar longitud mínima de 9 caracteres
        }

        var expiryInput = document.getElementById('expiracion');
        var cvvInput = document.getElementById('cvv');
        var cardNumberInput = document.getElementById('numeroTarjeta');
        var nombreTarjetaInput = document.getElementById('nombreTarjeta');

        expiryInput.addEventListener('input', function(event) {
            formatExpiry(event.target);
        });

        cvvInput.addEventListener('input', function(event) {
            formatCVV(event.target);
        });

        cardNumberInput.addEventListener('input', function(event) {
            var inputValue = event.target.value.replace(/\D/g, '').substring(0, 16); // Limitar a 16 caracteres
            var formattedValue = inputValue.replace(/(\d{4})/g, '$1 ').trim(); // Dividir automáticamente en grupos de 4
            cardNumberInput.value = formattedValue;
        });

        nombreTarjetaInput.addEventListener('input', function(event) {
            formatNombre(event.target);
        });

        document.getElementById("checkoutForm").addEventListener("submit", function(event){
            var inputFecha = document.getElementById("expiracion").value;
            var inputCardNumber = document.getElementById("numeroTarjeta").value.replace(/\s/g, ''); // Eliminar espacios para contar solo los dígitos
            var inputCVV = document.getElementById("cvv").value;
            var inputNombreTarjeta = document.getElementById("nombreTarjeta").value;

            if (!validarFecha(inputFecha)) {
                event.preventDefault();  
                alert("Por favor, ingrese una fecha de vencimiento válida.");
            } else if (inputCardNumber.length !== 16) {
                event.preventDefault();  
                alert("Por favor, ingrese un número de tarjeta válido con 16 dígitos.");
            } else if (inputCVV.length !== 3) {
                event.preventDefault();  
                alert("Por favor, ingrese un CVV válido con 3 dígitos.");
            } else if (!validarNombre(inputNombreTarjeta)) {
                event.preventDefault();  
                alert("Por favor, ingrese un nombre válido.");
            } else {
                alert("Pago realizado con éxito.");
            }
        });
    

    })



    /*INICIAR SESIÓN*/
    /*Registrarse*/
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');
    function crearUsuario() {
        alert('el usuario se ha guardado correctamente');

    };
    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{8,9}$/ // 8 a 9 numeros.
    }

    const campos = {
        usuario: false,
        nombre: false,
        password: false,
        correo: false,
        telefono: false
    }

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "usuario":
                validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword2();
            break;
            case "password2":
                validarPassword2();
            break;
            case "correo":
                validarCampo(expresiones.correo, e.target, 'correo');
            break;
            case "telefono":
                validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        }
    }

    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    }

    const validarPassword2 = () => {
        const inputPassword1 = document.getElementById('password');
        const inputPassword2 = document.getElementById('password2');

        if(inputPassword1.value !== inputPassword2.value){
            document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos['password'] = false;
        } else {
            document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos['password'] = true;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });


});


