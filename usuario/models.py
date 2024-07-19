from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
#USUARIO
class Usuario(models.Model):
    rut              = models.CharField(primary_key=True, max_length=10)
    nickname          = models.CharField(max_length=16)
    nombre           = models.CharField(max_length=16)
    apellido_paterno = models.CharField(max_length=20)
    apellido_materno = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField(blank=False, null=False) 
    id_genero        = models.ForeignKey('Genero',on_delete=models.CASCADE, db_column='idGenero')  
    telefono         = models.CharField(max_length=45)
    email            = models.EmailField(max_length=100, blank=False, null=False)
    direccion        = models.CharField(max_length=50, blank=False, null=False)  
    imagen           = models.ImageField(upload_to='fotos/', null=True)
    activo           = models.IntegerField()
    
def __str__(self):
        return str(self.nombre)+" "+str(self.apellido_paterno)   
#GENERO
class Genero(models.Model):
    id_genero  = models.AutoField(db_column='idGenero', primary_key=True) 
    genero     = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return str(self.genero)
    
#PRODUCTO
class Producto(models.Model):
    id_producto             = models.AutoField(db_column='idProducto', primary_key=True) 
    nombre_producto         = models.CharField(max_length=200)
    descripcion_producto    = models.CharField(max_length=300)
    precio_producto         = models.CharField(max_length=200)
    categoriaProducto    = models.ForeignKey('CategoriaProducto',on_delete=models.CASCADE, db_column='idCategoriaProducto')  
    imagen_producto         = models.ImageField(upload_to='fotos/', null=True, blank=True)
    
def __str__(self):
        return str(self.nombre_producto)

#CATEGORIA PRODUCTO
class CategoriaProducto(models.Model):
    id_categoriaProducto    = models.AutoField(db_column='idCategoriaProducto', primary_key=True) 
    categoriaProducto       = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return str(self.categoriaProducto)
    