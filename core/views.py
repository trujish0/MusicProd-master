import json
from django.shortcuts import redirect, render
from core.models import Envio, Products,Cliente
from .forms import  ClienteForm, ProductoForm,EnvioForm
from django.urls import reverse
import requests
from django.contrib.auth.decorators import login_required
#import js2py
#from temp import * 


# Create your views here.
def base(request):
    return render(request,'core/base.html')

def index(request):
    return render(request,'core/index.html')

def productos(request):
    return render(request,'core/productos.html')

@login_required
def listaProducto(request):
    if request.user.has_perm('core.Vendedor'):
        resp = requests.get('https://localhost:44333/Api/Producto/ListarProductos', verify=False)
        js = json.loads(resp.content)
        listaProductos = []
        for key in js:
            producto = Products.objects.create(
                    idProducto =key["IdProducto"],
                    nombreProducto=key["NombreProducto"],
                    marca=key["Marca"],
                    stock = key["Stock"],
                    precio=key["Precio"],
                    descripcion=key["Descripcion"],
                    image = key["Imagen"],
                )
            listaProductos.append(producto)
    else:
        return redirect(reverse('login')+'?next=/listaProducto/')
    return render(request,'core/listaProducto.html',{'listaProductos':listaProductos})

@login_required
def editarProductos(request,idproducto):
    if request.user.has_perm('core.Vendedor'):
        resp = requests.get('https://localhost:44333/Api/Producto/Buscar_X_ID?id='+idproducto, verify=False)
        js = resp.json()
        producto = Products.objects.create(
                    idProducto =js["IdProducto"],
                    nombreProducto=js["NombreProducto"],
                    marca=js["Marca"],
                    stock = js["Stock"],
                    precio=js["Precio"],
                    descripcion=js["Descripcion"],
                    image = js["Imagen"],
                )
        form = ProductoForm(instance=producto)
        if request.method == 'POST':
            form = ProductoForm(request.POST, request.FILES,instance=producto )
            form.fields['idProducto'].required = False
            if form.is_valid():
                nombreProducto= form.cleaned_data.get('nombreProducto')
                marca=form.cleaned_data.get('marca')
                stock =form.cleaned_data.get('stock')
                precio =form.cleaned_data.get('precio')
                descripcion =form.cleaned_data.get('descripcion')
                image =form.cleaned_data.get('image')
                obj = Products.objects.create(
                    idProducto = idproducto,
                    nombreProducto=nombreProducto,
                    marca=marca,
                    stock = stock,
                    precio=precio,
                    descripcion=descripcion,
                    image = image
                )
                obj2  = {
                    'IdProducto': obj.idProducto,
                    'NombreProducto': obj.nombreProducto,
                    'Marca': marca,
                    'Stock': stock,
                    'Precio': precio,
                    'Descripcion': descripcion,
                    'Imagen': obj.image.url
                    }
                resp = requests.put('https://localhost:44333/Api/Producto/ActualizarProducto', data=obj2, verify=False)
                return redirect(reverse('listaProducto')+"?OK")
            else:
                return redirect(reverse('editarProductos', args=[str(idproducto)] )+"?FAIL")
    else:
        return redirect(reverse('login')+'?next=/editarProductos/')
    return render(request, "core/editarProductos.html",{'form':form})

@login_required
def deleteProductos(request,idproducto):
    if request.user.has_perm('core.Vendedor'):
        resp = requests.delete('https://localhost:44333/Api/Producto/BorrarProducto?id='+idproducto, verify=False)
        return redirect(reverse('listaProducto')+"?DOK")
    else:
        return redirect(reverse('login')+'?next=/deleteProductos/')
    
def detalleproducto(request,idproducto):
    form = ProductoForm()
    resp = requests.get('https://localhost:44333/Api/Producto/Buscar_X_ID?id='+idproducto, verify=False)
    js = resp.json()
    producto = Products.objects.create(
                idProducto =js["IdProducto"],
                nombreProducto=js["NombreProducto"],
                marca=js["Marca"],
                stock = js["Stock"],
                precio=js["Precio"],
                descripcion=js["Descripcion"],
                image = js["Imagen"],
            )
    return render(request, "core/detalleproducto.html",{'form':form, 'id':id,'producto':producto})

@login_required
def agregarProducto(request):
    if request.user.has_perm('core.Vendedor'):
        if request.method == 'POST':
            form = ProductoForm(request.POST, request.FILES )
            form.fields['idProducto'].required = False
            if form.is_valid():
                nombreProducto= form.cleaned_data.get('nombreProducto')
                marca=form.cleaned_data.get('marca')
                stock =form.cleaned_data.get('stock')
                precio =form.cleaned_data.get('precio')
                descripcion =form.cleaned_data.get('descripcion')
                image =form.cleaned_data.get('image')
                obj = Products.objects.create(
                    idProducto = 0,
                    nombreProducto=nombreProducto,
                    marca=marca,
                    stock = stock,
                    precio=precio,
                    descripcion=descripcion,
                    image = image
                )
                obj2  = {
                    'IdProducto': obj.idProducto,
                    'NombreProducto': obj.nombreProducto,
                    'Marca': marca,
                    'Stock': stock,
                    'Precio': precio,
                    'Descripcion': descripcion,
                    'Imagen': obj.image.url
                    }
                resp = requests.post('https://localhost:44333/Api/Producto/GuardarProducto', data=obj2, verify=False)
                return redirect(reverse('agregarProducto')+"?OK") 
            else:
                return redirect(reverse('agregarProducto')+"?FAIL")
        else:
            form = ProductoForm
    else:
        return redirect(reverse('login')+'?next=/agregarProducto/')
    return render(request, "core/agregarProducto.html",{'form':form})

def detallecompra(request,total):
    if request.method == 'POST':
        form = EnvioForm(request.POST, request.FILES )
        form.fields['idEnvio'].required = False
        form.fields['indicaciones'].required = False
        if form.is_valid():
            cliente= form.cleaned_data.get('cliente')
            direccion=form.cleaned_data.get('direccion')
            ciudad =form.cleaned_data.get('ciudad')
            comuna =form.cleaned_data.get('comuna')
            indicaciones =form.cleaned_data.get('indicaciones')
            obj = Envio.objects.create(
                idEnvio = 0,
                cliente=cliente,
                direccion=direccion,
                ciudad = ciudad,
                comuna=comuna,
                indicaciones=indicaciones
            )
            #return redirect(reverse('detallecompra', args=[str(0)] )+"?OK") 
        else:
            return redirect(reverse('detallecompra')+"?FAIL")
    else:
        form = EnvioForm
    return render(request,'core/detallecompra.html',{'form':form,'total':total})

def carrito(request):
    if request.method == 'POST':
        total =  request.POST.get('monto').replace('$', '');
        return redirect('detallecompra',total) 
    return render(request,'core/carrito.html')





def listaPedido(request):
    return render(request,'core/listaPedido.html')

def detallePedido(request):
    return render(request,'core/detallePedido.html')

def listaVentas(request):
    return render(request,'core/listaVentas.html')

def detalleVenta(request):
    return render(request,'core/detalleVenta.html')

def pago(request):
    return render(request,'core/pago.html')

def misCompras(request):
    return render(request,'core/misCompras.html')
