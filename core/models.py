from django.db import models

class Products(models.Model):
    idProducto = models.IntegerField(verbose_name="Id Producto",null=True)
    nombreProducto = models.TextField(verbose_name="Nombre Producto", max_length=50)
    marca = models.TextField(verbose_name="Marca")
    stock = models.IntegerField(verbose_name="Stock")
    precio = models.IntegerField(verbose_name="Precio")
    descripcion = models.TextField(verbose_name="Descripcion")
    image = models.ImageField(verbose_name="Imagen",upload_to="products")

    class Meta:
        verbose_name = "producto"
        verbose_name_plural = "productos"
        permissions = (('Bodeguero', 'P_Bodeguero'), ('Vendedor', 'P_Vendedor'),('Cliente', 'P_Cliente'),('Contador', 'P_Contador'))

    def __str__(self):
        return self.nombreProducto
    
    

class Envio(models.Model):
    idEnvio = models.IntegerField(verbose_name="Id Envio",null=True)
    cliente = models.TextField(verbose_name="Nombre Cliente")
    direccion = models.TextField(verbose_name="Direccion", max_length=100)
    ciudad = models.TextField(verbose_name="Ciudad")
    comuna = models.TextField(verbose_name="Comuna")
    indicaciones = models.TextField(verbose_name="indicaciones",blank=True,null=True)
    class Meta:
        verbose_name = "envio"
        verbose_name_plural = "envios"

    def __str__(self):
        return self.cliente

class Cliente(models.Model):
    idCliente = models.IntegerField(verbose_name="Id Envio",null=True)
    cliente = models.TextField(verbose_name="Nombre Cliente")
    correo = models.TextField(verbose_name="Email", max_length=100)
    class Meta:
        verbose_name = "cliente"
        verbose_name_plural = "clientes"

    def __str__(self):
        return self.cliente
