// FUncionalidad para validar formulario
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contacto").addEventListener('submit', validarFormulario);
});

// Funcion que valida los campos
function validarFormulario(evento) {
    evento.preventDefault();
    //Valida ingreso del Rut
    var rut = document.getElementById('rut').value;
    if (rut.length == 0) {
        alert('Debe ingresar el RUT');
        return;
    }
    //Valida ingreso de Nombre
    var nombre = document.getElementById('nombre').value;
    if (nombre.length == 0) {
        alert('Debe ingresar el Nombre');
        return;
    }
    //Valida ingreso de Fecha de Nacimiento
    var fchNac = document.getElementById('fecha_nacimiento').value;
    if (fchNac.length == 0) {
        alert('Debes ingresar tu Fecha de Nacimiento');
        return;
    }
    // Variables para validar Fecha de Nacimiento
    // Fecha digitada en Formulario
    var fchNacFor = new Date(document.getElementById('fecha_nacimiento').value);
    // Fecha actual
    var fchNacNow = new Date();
    // Variable para comaprar la mayoria de edad
    var mayorEdad = 1000 * 60 * 60 * 24 * 365 * 18; //milisegundos * segundos * minutos * horas * dias del año * cantidad de años
    // Valida fecha futura
    if (fchNacFor.getTime() > fchNacNow.getTime()) {
        alert('La Fecha de Nacimiento no puede ser Mayor a Hoy');
        return;
    }
    // Valida mayoria de edad
    if (fchNacNow - fchNacFor < mayorEdad) {
        alert('Para Registrarte debes ser Mayor de Edad');
        return;
    }

    if (validaEmail(document.getElementById('email').value)) {
        alert('Debe ingresar un Email Valido');
        return;
    }

    // Valida que password no este vacio
    var pass = document.getElementById('password').value;
    if (pass == '') {
        alert('Debe ingresar la password');
        return;
    }
    // Valida que password se igual en ambos campos
    var passValidate = document.getElementById('validate-password').value;
    if (pass != passValidate) {
        alert('La password no coincide');
        return;
    }
    var comentario = document.getElementById('comentarios').value;
    if (comentario == '') {
        alert('Debe ingresar algun comentario');
        return;
    }



    this.submit();
}


// Funcion para formatear y validar RUT
function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.', '');
    valor = valor.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo + '-' + dv;

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false; }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}

// Funcion para validar mail
function validaEmail(valor) {
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!re.exec(valor)) {
        return true;
    } else return false;
}

function comentario(comentario) {
    var largoMax = 50;
    var length = comentario.value.length;
    document.getElementById('contador').innerHTML = largoMax - length;
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (length > largoMax) {
        comentario.setCustomValidity("El Comentario es muy largo, debe eliminar " + (Math.abs(largoMax - length)) + " caracteres");
        return false;

    } else {
        comentario.setCustomValidity("");
    }
}