function actualizaHora() {
    var fecha = new Date();
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var hora = (fecha.getHours() < 10) ? '0' + fecha.getHours() : fecha.getHours();
    var min = (fecha.getMinutes() < 10) ? '0' + fecha.getMinutes() : fecha.getMinutes();
    var seg = (fecha.getSeconds() < 10) ? '0' + fecha.getSeconds() : fecha.getSeconds();
    var hra = fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' ' + fecha.getFullYear() +
        ' ' + hora + ':' + min + ':' + seg;
    document.getElementById("hora").innerHTML = hra;
    var tiempo = setTimeout(function() { actualizaHora(); }, 1000);
}

function apagarLuz() {
    var luz = document.getElementById('luz').checked;
    if (!luz) {
        document.getElementById('body').setAttribute('class', 'bg-secondary');
        document.getElementById('navbar').setAttribute('class', 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top');
        document.getElementById('footer').setAttribute('class', 'footer mt-4 py-4 bg-dark');
        document.getElementById('jumbotron').setAttribute('class', 'jumbotron-dark jumbotron-fluid text-muted');
    } else {
        document.getElementById('body').setAttribute('class', '');
        document.getElementById('navbar').setAttribute('class', 'navbar navbar-expand-lg navbar-indigo bg-indigo fixed-top');
        document.getElementById('footer').setAttribute('class', 'footer mt-4 py-4 bg-indigo');
        document.getElementById('jumbotron').setAttribute('class', 'jumbotron jumbotron-fluid text-muted');
    }


}