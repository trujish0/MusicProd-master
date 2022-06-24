/*jshint esversion: 6 */
function validar() {

    /*creo una variable de tipo booleano que en principio tendrá un valor true(verdadero),
    y que se convertirá en false(falso) cuando la condición no se cumpla*/
    var todo_correcto = true;

    if (document.getElementById('id_cliente').value.length < 2) {
        todo_correcto = false;
    }
    if (document.getElementById('id_direccion').value.length < 2) {
        todo_correcto = false;
    }
    if (document.getElementById('id_comuna').value.length < 2) {
        todo_correcto = false;
    }

    /*Para comprobar el email haremos uso de una expresión regular. Esto es una secuencia
    de caracteres que nos dirá si el valor ingresado por el usuario tiene estructura de
    correo electrónico. Lo que hacemos es obtener el value del campo de texto destinado
    al email, y le aplicamos el método test() del objeto global RegExp(que nos permite
    trabajar con expresiones regulares).
    var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
    var email = document.form1.email.value;
    if (!expresion.test(email)) {
        todo_correcto = false;
    }*/

    /*Para validar el select debemos añadir un value distinto a cada option. En el
    código, he asignado un value con  valor vacío al primer option. Los siguientes,
    al no estar definidos toman el valor por defecto. Por tanto, si todos tienen value,
    lo único que tenemos que comprobar es que este no sea vacío. Si es vacío, todo_correcto
    será false.*/
    if (document.getElementById('id_ciudad').value.length < 2) {
        todo_correcto = false;
    }

    /*Validaremos también el checkbox del formulario. Todos los
    checkbox tienen una propiedad llamada checked. Entonces
    hacemos el if y decimos que si nuestro checkbox NO está
    checked, estará mal.
    if (!document.getElementById('acepto').checked) {
        todo_correcto = false;
    }*/

    /*Por último, y como aviso para el usuario, si no está todo bién, osea, si la variable
    todo_correcto ha devuelto false al menos una vez, generaremos una alerta advirtiendo
    al usuario de que algunos datos ingresados no son los que esperamos.*/
    if (!todo_correcto) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Alguno de los campos no están correctos, favor revisar',
            showConfirmButton: false,
            timer: 3000
        });
    } else {
        soapRequest();
    }
}

function soapRequest() {
    const nombre = document.getElementById('id_cliente').value;
    const direccion = document.getElementById('id_direccion').value;
    const comuna = document.getElementById('id_comuna').value;
    const ciudad = document.getElementById('id_ciudad').value;
    const indicaciones = document.getElementById('id_indicaciones').value;
    var total = document.getElementById('id_total').value;
    const productos = obtenerIdProductosLocalStorage();
    total = total.substr(12);
    var str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:InsertarPedido>' +
        '<!--Optional:-->' +
        '<tem:pedido>' +
        '<tem:IdPedido>1</tem:IdPedido>' +
        '<!--Optional:-->' +
        '<tem:Nombre>' + nombre + '</tem:Nombre>' +
        '<!--Optional:-->' +
        '<tem:Direccion>' + direccion + '</tem:Direccion>' +
        '<!--Optional:-->' +
        '<tem:Comuna>' + comuna + '</tem:Comuna>' +
        '<!--Optional:-->' +
        '<tem:Ciudad>' + ciudad + '</tem:Ciudad>' +
        '<!--Optional:-->' +
        '<tem:Indicaciones>' + indicaciones + '</tem:Indicaciones>' +
        '<tem:Total>' + total + '</tem:Total>' +
        '<!--Optional:-->' +
        '<tem:Productos>' + productos + '</tem:Productos>' +
        '</tem:pedido>' +
        '</tem:InsertarPedido>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';


    var xhr = createCORSRequest("POST", "https://localhost:44348/WSPedidos.asmx");
    if (!xhr) {
        console.log("XHR issue");
        return;
    }

    xhr.onload = function() {
        var results = xhr.responseText;
        console.log(results);
        //if (results.includes("OK")) {
           // vaciarLocalStorage();
            window.location = "/pago";
            console.log("Por fin");
       // }

    };

    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(str);
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        console.log("CORS not supported");
        alert("CORS not supported");
        xhr = null;
    }
    return xhr;
}

function obtenerIdProductosLocalStorage() {
    let productoLS;
    var productos = '';
    //Comprobar si hay algo en LS
    if (localStorage.getItem('productos') === null) {
        productoLS = '';
    } else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
        productoLS.forEach(function(producto) {
            productos = productos + producto.id + ',';
        });
    }
    productos = productos.substr(0, productos.length - 1);
    return productos;
}

function vaciarLocalStorage() {
    localStorage.clear();
}