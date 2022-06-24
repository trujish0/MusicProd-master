from django.contrib import admin

# Register your models here.
from .models import Products,Envio

class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ('created','update')

