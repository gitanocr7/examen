document.addEventListener("DOMContentLoaded", function() {
    // Inicializar el carrito y cargar los productos
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const productosDiv = document.querySelector('.producto .dina');
    productosDiv.innerHTML = '';
    let total = 0;

    for (const id in carrito) {
        const producto = carrito[id];
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto-item');
        productoElement.innerHTML = `
            <div class="producto-flex">
                <div>
                    <p>${producto.cantidad}  ${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                </div>
            </div>
        `;
        productosDiv.appendChild(productoElement);

        const precio = parseFloat(producto.precio.replace('$', '').replace(',', ''));
        total += precio * producto.cantidad;
    }

    const impuesto = total * 0.19;
    const totalFinal = total + impuesto;

    const pagoImpuestosDiv = document.createElement('div');
    pagoImpuestosDiv.classList.add('pago-impuestos');
    pagoImpuestosDiv.innerHTML = `
        <div>
            <p>Precio </p> <p>Impuestos</p>
        </div>
        <div>
            <p>$${total.toFixed(3)} </p> <p>$${impuesto.toFixed(3)}</p>
        </div>
    `;

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `
        <div>
            <p>Total a pagar</p> <p>$${totalFinal.toFixed(3)}</p>
        </div>
    `;

    productosDiv.appendChild(pagoImpuestosDiv);
    productosDiv.appendChild(totalDiv);
});

document.addEventListener("DOMContentLoaded", function() {
    const tarjetaDiv = document.getElementById("tarjetaDiv");
    const paypalDiv = document.getElementById("paypalDiv");
    const tarjetaRadio = document.getElementById("tarjeta");
    const paypalRadio = document.getElementById("paypal");
    const datosTarjetaContainer = document.getElementById("datosTarjetaContainer");

    function toggleTarjetaFields() {
        if (tarjetaRadio.checked) {
            datosTarjetaContainer.classList.remove("hidden");
        } else {
            datosTarjetaContainer.classList.add("hidden");
        }
    }

    toggleTarjetaFields();

    tarjetaDiv.addEventListener("click", function() {
        tarjetaRadio.checked = true;
        toggleTarjetaFields();
    });

    paypalDiv.addEventListener("click", function() {
        paypalRadio.checked = true;
        toggleTarjetaFields();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function formatCVV(input) {
        input.value = input.value.replace(/\D/g, '').substring(0, 3);
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
        input.value = input.value.toUpperCase().replace(/[^A-Z\s]/g, '');
    }

    function validarNombre(input) {
        return input.length >= 9;
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
        var inputValue = event.target.value.replace(/\D/g, '').substring(0, 16);
        var formattedValue = inputValue.replace(/(\d{4})/g, '$1 ').trim();
        cardNumberInput.value = formattedValue;
    });

    nombreTarjetaInput.addEventListener('input', function(event) {
        formatNombre(event.target);
    });

    document.getElementById("checkoutForm").addEventListener("submit", function(event){
        var inputFecha = document.getElementById("expiracion").value;
        var inputCardNumber = document.getElementById("numeroTarjeta").value.replace(/\s/g, '');
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
            event.preventDefault(); // Prevenir el envío del formulario
            mostrarModal();
        }
    });

    function mostrarModal() {
        const modal = document.getElementById("modalBoleta");
        const detalleCompra = document.getElementById("detalleCompra");

        detalleCompra.innerHTML = '';

        const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
        let total = 0;

        for (const id in carrito) {
            const producto = carrito[id];
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-item');
            productoElement.innerHTML = `
                <div class="producto-flex">
                    <div style="
                        align-items: flex-start;
                        display: flex;
                        flex-direction: column;">
                        <p>${producto.cantidad}  ${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p>
                    </div>
                </div>
            `;
            detalleCompra.appendChild(productoElement);

            const precio = parseFloat(producto.precio.replace('$', '').replace(',', ''));
            total += precio * producto.cantidad;
        }

        const impuesto = total * 0.19;
        const totalFinal = total + impuesto;
        const fechaCompra = new Date().toLocaleDateString();
        const nombreUsuario = document.getElementById("nombreUsuario").value;

        const pagoImpuestosDiv = document.createElement('div');
        pagoImpuestosDiv.classList.add('pago-impuestos');
        pagoImpuestosDiv.innerHTML = `
            <div style="
                align-items: flex-start;
                display: flex;
                flex-direction: column;">
                <p>Precio </p> <p>Impuestos</p>
            </div>
            <div style="
                align-items: flex-end;
                display: flex;
                flex-direction: column;">
                <p>$${total.toFixed(3)} </p> <p>$${impuesto.toFixed(3)}</p>
            </div>
        `;

        const totalDiv = document.createElement('div');
        totalDiv.classList.add('total');
        totalDiv.innerHTML = `
            <div>
                <p>Total a pagar</p>
            </div>
            <div>
                <p>$${totalFinal.toFixed(3)}</p>
            </div>
        `;

        detalleCompra.appendChild(pagoImpuestosDiv);
        detalleCompra.appendChild(totalDiv);

        const datosCompraDiv = document.createElement('div');
        datosCompraDiv.classList.add('datos-compra');
        datosCompraDiv.innerHTML = `
            <p>Fecha de compra: ${fechaCompra}</p>
            <p>Nombre de usuario: ${nombreUsuario}</p>
        `;

        detalleCompra.appendChild(datosCompraDiv);

        modal.style.display = "flex";
    }

    const closeModalButton = document.querySelector(".close");
    closeModalButton.addEventListener("click", function() {
        const modal = document.getElementById("modalBoleta");
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        const modal = document.getElementById("modalBoleta");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
