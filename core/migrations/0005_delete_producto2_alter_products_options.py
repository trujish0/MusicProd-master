# Generated by Django 4.0.4 on 2022-05-21 19:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_producto2'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Producto2',
        ),
        migrations.AlterModelOptions(
            name='products',
            options={'permissions': (('permiso1', 'descripción 1'), ('permiso 2', 'descripción 2')), 'verbose_name': 'producto', 'verbose_name_plural': 'productos'},
        ),
    ]
