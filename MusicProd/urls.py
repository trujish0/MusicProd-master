"""MusicProd URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core import views
from django.conf import settings
from django.conf.urls import include
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('index/', views.index, name='index'),
    path('productos/', views.productos, name='productos'),
    path('listaProducto/', views.listaProducto, name='listaProducto'),
    path('editarProductos/<idproducto>', views.editarProductos, name='editarProductos'),
    path('detalleproducto/<idproducto>', views.detalleproducto, name='detalleproducto'),
    path('listaPedido/', views.listaPedido, name='listaPedido'),
    path('detallePedido/', views.detallePedido, name='detallePedido'),
    path('listaVentas/', views.listaVentas, name='listaVentas'),
    path('detalleVenta/', views.detalleVenta, name='detalleVenta'),
    path('carrito/', views.carrito, name='carrito'),
    path('detallecompra/<total>', views.detallecompra, name='detallecompra'),
    path('detallecompra/', views.detallecompra, name='detallecompra'),
    path('pago/', views.pago, name='pago'),
    path('misCompras/', views.misCompras, name='misCompras'),
    path('agregarProducto/', views.agregarProducto, name='agregarProducto'),
    path('deleteProductos/<idproducto>', views.deleteProductos, name='deleteProductos'),
    
    
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#Add Django site authentication urls (for login, logout, password management)
urlpatterns += [
    path('accounts/', include('django.contrib.auth.urls')),

]
