# Generated by Django 4.0.4 on 2022-05-21 19:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_products_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='products',
            options={'permissions': (('Bodeguero', 'Bodeguero'), ('Vendedor', 'Vendedor'), ('Cliente', 'Cliente'), ('Contador', 'Contador')), 'verbose_name': 'producto', 'verbose_name_plural': 'productos'},
        ),
    ]