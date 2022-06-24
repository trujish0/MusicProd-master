from django import forms
from django.forms import ModelForm
from .models import Cliente, Products,Envio


#### FORM PRODUCTO
class ProductoForm(ModelForm):

    class Meta:
        model = Products
        fields = [
            'idProducto',
            'nombreProducto',
            'marca',
            'stock',
            'precio',
            'descripcion',
            'image'
        ]
        labels = {
            'idProducto': 'Id de Prodcuto',
            'nombreProducto': 'Nombre del Producto',
            'marca': 'Marca',
            'stock': 'Stock',
            'precio': 'Valor',
            'descripcion': 'Descripcion',
            'image': 'Imagen'
        }
        widgets={
            'idProducto':forms.TextInput(attrs={'class':'form-control','type':'number'}),
            'nombreProducto':forms.TextInput(attrs={'class':'form-control'}),
            'marca':forms.TextInput(attrs={'class':'form-control'}),
            'stock':forms.TextInput(attrs={'class':'form-control','type':'number'}),
            'precio':forms.TextInput(attrs={'class':'form-control','type':'number'}),
            'descripcion':forms.TextInput(attrs={'class':'form-control'}),
            'image':forms.FileInput(attrs={'class':'form-control'})
        }
        
class EnvioForm(ModelForm):
    
    class Meta:
        model = Envio
        fields = [
            'idEnvio',
            'cliente',
            'direccion',
            'ciudad',
            'comuna',
            'indicaciones'
        ]
        labels = {
            'idEnvio': 'Id de Envio',
            'cliente': 'Nombre del Cliente',
            'direccion': 'Direccion',
            'ciudad': 'Ciudad',
            'comuna': 'Comuna',
            'indicaciones': 'indicaciones Adicionales'
        }
        widgets={
            'idEnvio':forms.TextInput(attrs={'class':'form-control','type':'number'}),
            'cliente':forms.TextInput(attrs={'class':'form-control'}),
            'direccion':forms.TextInput(attrs={'class':'form-control'}),
            'ciudad':forms.TextInput(attrs={'class':'form-control'}),
            'comuna':forms.TextInput(attrs={'class':'form-control'}),
            'indicaciones':forms.TextInput(attrs={'class':'form-control'})
        }
        
class ClienteForm(ModelForm):
    class Meta:
        model = Cliente
        fields = [
            'idCliente',
            'cliente',
            'correo'
        ]
        labels = {
            'idCliente': 'Id de Cliente',
            'cliente': 'Nombre del Cliente',
            'correo': 'Email'
        }
        widgets={
            'idCliente':forms.TextInput(attrs={'class':'form-control','type':'number'}),
            'cliente':forms.TextInput(attrs={'class':'form-control'}),
            'correo':forms.TextInput(attrs={'class':'form-control'})
        }