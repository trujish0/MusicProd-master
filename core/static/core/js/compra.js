/*jshint esversion: 6 */
const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito-pedido');
console.log(carrito);
const procesarCompraBtn = document.getElementById('procesar');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    document.addEventListener('DOMContentLoaded', compra.leerLocalStoragePedido());
    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e); });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra());

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e); });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e); });


}

function procesarCompra() {
    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location = "/productos";
        });
    } else {
        const total = document.getElementById('total').value;
        console.log("/detallecompra/" + total);
        //window.location = "/detallecompra/" + total;
        /*
                //aqui se coloca el user id generado en el emailJS

                var myform = $("form#procesar-pago");

                myform.submit((event) => {
                    event.preventDefault();

                    // Change to your service ID, or keep using the default service
                    var service_id = "default_service";
                    var template_id = "template_3SA9LsqQ";

                    const cargandoGif = document.querySelector('#cargando');
                    cargandoGif.style.display = 'block';

                    const enviado = document.createElement('img');
                    enviado.src = 'img/mail.gif';
                    enviado.style.display = 'block';
                    enviado.width = '150';

                    emailjs.sendForm(service_id, template_id, myform[0])
                        .then(() => {
                            cargandoGif.style.display = 'none';
                            document.querySelector('#loaders').appendChild(enviado);

                            setTimeout(() => {
                                compra.vaciarLocalStorage();
                                enviado.remove();
                                window.location = "index.html";
                            }, 2000);


                        }, (err) => {
                            alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                            // myform.find("button").text("Send");
                        });

                    return false;

                });*/

    }
}