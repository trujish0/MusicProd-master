# Generated by Django 4.0.4 on 2022-05-21 19:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_delete_producto2_alter_products_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='products',
            options={'permissions': (('Bodeguero', 'descripción 1'), ('Vendedor', 'descripción 2'), ('Cliente', 'descripción 3'), ('Contador', 'descripción 2')), 'verbose_name': 'producto', 'verbose_name_plural': 'productos'},
        ),
    ]