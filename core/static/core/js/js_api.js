//Consumi API PROPIA DE PRODUCTOS C# 
function generarCardGrid() {
    //aca hicimos el grid
    var grid_productos = document.getElementById("grid_productos");

    //Cargar los datos de la API
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'https://localhost:44333/Api/Producto/ListarProductos', true);
    xmlHttp.send();

    //Empezamos a llamar los datos
    xmlHttp.addEventListener('load', function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            //Crear la estructura de cada fila/registro que obtuvimos...
            for (var i = 0; i < data.length; i++) {

                var card_productos = document.createElement("div");

                //Aplicar clases de Bootstrap
                card_productos.setAttribute("class", "col mb-4");
                card_productos.setAttribute("id", "card" + i);
                var textoNombre = data[i].NombreProducto;
                var textoMarca = data[i].Marca;
                var imagen = data[i].Imagen;
                var id = data[i].IdProducto;
                var precio = data[i].Precio;

                card_productos.innerHTML = "<div>" +
                    "<a href='/detalleproducto/" + id + "' data-id='" + id + "'>" +
                    "<img src='" + imagen + "' class='card-img-top' alt='...'>" +
                    "</a>" +
                    "<div class='card-body'>" +
                    "<h4 class='card-title'>" + textoNombre + "</h4>" +
                    "<p class='card-text'> <b>Marca: " + textoMarca + "</b><br>" +
                    "<h1 class='card-title pricing-card-title precio'>$<span class=''>" + precio + "</span></h1>" +
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quisquam architecto voluptatem natus libero officiis, maxime doloribus maiores animi distinctio!</p>" +
                    "<a href='' class='btn btn-block btn-primary agregar-carrito' data-id='1'>Añadir al Carrito</a>" +
                    "</div>" +
                    "</div>";

                grid_productos.appendChild(card_productos);
            }
        }
    });
}