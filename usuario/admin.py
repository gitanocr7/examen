from django.contrib import admin
from .models import Genero, Usuario, Producto, CategoriaProducto

# Register your models here.
admin.site.register(Genero)
admin.site.register(Usuario)
admin.site.register(Producto)
admin.site.register(CategoriaProducto)