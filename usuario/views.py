from django.shortcuts import render, redirect
from .models import Genero, Usuario, CategoriaProducto, Producto
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import RegistroForm
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

# Create your views here.

@login_required
def crud(request):
    usuario =   Usuario.objects.all()
    context = {"usuario": usuario, "mensaje": "Cargados exitosamente!"}
    return render(request,'core/crud.html', context)


def index(request):
    return render(request,'core/index.html')

def contacto(request):
    return render(request,'core/contacto.html')


def checkout(request):
    return render(request,'core/checkout.html')

def crearUsuario(request):
    return render(request,'core/crearUsuario.html')

def inicioSesion(request):
    return render(request,'core/inicioSesion.html')


def producto(request):
    return render(request,'core/producto.html')

def quienesSomos(request):
    return render(request,'core/quienesSomos.html')

def servicio(request):
    return render(request,'core/servicio.html')


def crudProducto(request):
    producto =   Producto.objects.all()
    categoria = CategoriaProducto.objects.all()
    context = {"producto": producto,"categoria":categoria, "mensaje": "Cargados exitosamente!"}
    return render(request,'core/crudProducto.html', context)


## AGREGAR USUARIO DESDE ADMIN
def usuarioAdd(request):
    if request.method != "POST":
        genero = Genero.objects.all()
        context = {"genero": genero }
        return render(request,'core/usuarioAdd.html', context )
    else:
        rut = request.POST["r"]
        nickname = request.POST["u"]
        nombre = request.POST["n"]
        apellidoP = request.POST["p"]
        apellidoM = request.POST["m"]
        fechaNacimiento = request.POST["f"]
        activo = 1
        genero = request.POST["g"]
        objGenero = Genero.objects.get(id_genero = genero)
        telefono = request.POST["t"]
        correo = request.POST["c"]
        direccion = request.POST["d"]
        imagen      = request.FILES["i"]

        objUsuario = Usuario.objects.create(
            rut              = rut,
            nickname         = nickname,
            nombre           = nombre,
            apellido_paterno = apellidoP,
            apellido_materno = apellidoM,
            fecha_nacimiento = fechaNacimiento,
            id_genero        = objGenero,
            telefono         = telefono,
            email            = correo,
            direccion        = direccion,
            imagen           = imagen,
            activo           = activo
        )
        objUsuario.save()
        usuario = Usuario.objects.all()
        context = {"usuario": usuario,"mensaje": "usuario creado exitosamente!"}
        return render(request,'core/crud.html',context)
    
# CREAR USUARIO DESDE USUARIO
def crearUsuario(request):
    if request.method != "POST":
        genero = Genero.objects.all()
        context = {"genero": genero }
        return render(request,'core/crearUsuario.html', context )
    else:
        rut = request.POST["r"]
        nickname = request.POST["u"]
        nombre = request.POST["n"]
        apellidoP = request.POST["p"]
        apellidoM = request.POST["m"]
        fechaNacimiento = request.POST["f"]
        activo = 1
        genero = request.POST["g"]
        objGenero = Genero.objects.get(id_genero = genero)
        telefono = request.POST["t"]
        correo = request.POST["c"]
        direccion = request.POST["d"]
        imagen      = request.FILES["i"]

        objUsuario = Usuario.objects.create(
            rut              = rut,
            nickname         = nickname,
            nombre           = nombre,
            apellido_paterno = apellidoP,
            apellido_materno = apellidoM,
            fecha_nacimiento = fechaNacimiento,
            id_genero        = objGenero,
            telefono         = telefono,
            email            = correo,
            direccion        = direccion,
            imagen           = imagen,
            activo           = activo

        )
        objUsuario.save()
        usuario = Usuario.objects.all()
        context = {"usuario": usuario,"mensaje": "usuario creado exitosamente!"}
        return render(request,'core/index.html',context)
    
## ELIMINAR USUARIO
def usuario_del(request,pk):
    context = {}
    try:
        usuario = Usuario.objects.get(rut = pk)
        usuario.delete()
        usuario = Usuario.objects.all()
        context = {"usuario": usuario,"mensaje": "usuario eliminado exitosamente!"}
        return render(request,'core/crud.html',context)
    except:
        usuario = Usuario.objects.all()
        context = {"usuario": usuario,"mensaje": "no se pudo eliminar el usuario"}
        return render(request,'core/crud.html',context)


    
## ENCONTRAR USUARIO
def usuario_findEdit(request,pk):
    if pk !='':
        usuario = Usuario.objects.get(rut = pk)
        genero  = Genero.objects.all()
        context = {"usuario":usuario, "genero":genero}
        return render(request,'core/usuarioUpdate.html',context)
    else:
        usuario = Usuario.objects.all()
        context = {"usuario": usuario,"mensaje": "no se pudo modificar el usuario"}
        return render(request,'core/crud.html',context)
    
## ACTUALIZAR USUARIO
def usuarioUpdate(request):
    if request.method == 'POST':
        rut = request.POST["r"]
        nickname = request.POST["u"]
        nombre = request.POST["n"]
        apellidoP = request.POST["p"]
        apellidoM = request.POST["m"]
        fechaNacimiento = request.POST["f"]
        activo = 1
        genero = request.POST["g"]
        objGenero = Genero.objects.get(id_genero = genero)
        telefono = request.POST["t"]
        correo = request.POST["c"]
        direccion = request.POST["d"]

        usuario = Usuario()
        usuario.rut = rut
        usuario.nickname = nickname
        usuario.nombre = nombre
        usuario.apellido_paterno = apellidoP
        usuario.apellido_materno = apellidoM
        usuario.fecha_nacimiento = fechaNacimiento
        usuario.activo = activo
        usuario.id_genero = objGenero
        usuario.telefono = telefono
        usuario.correo = correo
        usuario.direccion = direccion
        usuario.save()
        usuario = Usuario.objects.all()
        context = {"usuario": usuario,"mensaje": "usuario modificado exitosamente!"}
        return render(request,'core/crud.html',context)
    else:
        usuario = Usuario.objects.all()
        context = {"usuario": usuario,"mensaje": "no se pudo modificar el usuario"}
        return render(request,'core/crud.html',context)
    

## AGREGAR PRODUCTO
def productoAdd(request):
    if request.method != "POST":
        categoriaProducto = CategoriaProducto.objects.all()
        context = {"categoria": categoriaProducto }
        return render(request,'core/productoAdd.html',context)
    else:
        nombreProducto          = request.POST["np"]
        descripcionProducto     = request.POST["dp"]
        categoriaProducto       = request.POST["cp"]
        precioProducto          = request.POST["pp"]
        objCategoriaProducto    = CategoriaProducto.objects.get(id_categoriaProducto = categoriaProducto)
        imagenProducto          = request.FILES["ip"]

        objProducto = Producto.objects.create(

            nombre_producto         = nombreProducto,
            descripcion_producto    = descripcionProducto,
            id_categoriaProducto    = objCategoriaProducto,
            precio_producto         = precioProducto,
            imagen_producto         = imagenProducto
        )
        objProducto.save()
        producto = Producto.objects.all()
        categoria = CategoriaProducto.objects.all()
        context = {"producto": producto,"categoria":categoria,"mensaje": "producto creado exitosamente!"}
        return render(request,'core/crudProducto.html',context)
    

## ACTUALIZAR PRODUCTO
def productoUpdate(request):
    if request.method == 'POST':
        idproducto              = request.POST["idp"]
        nombreProducto          = request.POST["np"]
        descripcionProducto     = request.POST["dp"]
        categoriaProducto       = request.POST["cp"]
        objCategoriaProducto    = CategoriaProducto.objects.get(id_categoriaProducto = categoriaProducto)
        precioProducto          = request.POST["pp"]
        imagenProducto          = request.FILES["ip"]

        producto = Producto()
        producto.id_producto = idproducto
        producto.nombre_producto = nombreProducto
        producto.descripcion_producto = descripcionProducto
        producto.precio_producto = precioProducto
        producto.id_categoriaProducto = objCategoriaProducto
        producto.imagen_producto = imagenProducto

        producto.save()
        producto = Producto.objects.all()
        categoria = CategoriaProducto.objects.all()
        context = {"producto": producto,"categoria":categoria,"mensaje": "producto modificado exitosamente!"}
        return render(request,'core/crudProducto.html',context)
    else:
        producto = Producto.objects.all()
        categoria = CategoriaProducto.objects.all()
        context = {"producto": producto,"categoria":categoria,"mensaje": "no se pudo modificar el producto"}
        return render(request,'core/crudProducto.html',context)
    

## ENCONTRAR PRODUCTO
def producto_findEdit(request,pk):
    if pk !='':
        producto = Producto.objects.get(id_producto = pk)
        categoria = CategoriaProducto.objects.all()
        context = {"producto":producto,"categoria":categoria}
        return render(request,'core/productoUpdate.html',context)
    else:
        producto = Producto.objects.all()
        categoria = CategoriaProducto.objects.all()
        context = {"producto": producto,"categoria":categoria,"mensaje": "no se pudo modificar el producto"}
        return render(request,'core/crudProducto.html',context)
    

## BORRAR PRODUCTO
def producto_del(request,pk):
    context = {}
    try:
        producto = Producto.objects.get(id_producto = pk)
        producto.delete()
        producto = Producto.objects.all()
        categoria = CategoriaProducto.objects.all()
        context = {"producto": producto,"categoria":categoria,"mensaje": "producto eliminado exitosamente!"}
        return render(request,'core/crudProducto.html',context)
    except:
        producto = Producto.objects.all()
        categoria = CategoriaProducto.objects.all()
        context = {"producto": producto,"categoria":categoria,"mensaje": "no se pudo eliminar el producto"}
        return render(request,'core/crudProducto.html',context)

def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect('index')
    else:
        form = RegistroForm()
    return render(request, 'usuario/registro.html', {'form': form})



def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            if user is not None:
                login(request, user)
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False})
        else:
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                return render(request, 'usuario/loginUsuario.html', {'form': request.POST, 'errors': 'Nickname'})
    else:
        return render(request, 'usuario/login.html')

def logout_view(request):
    logout(request)
    return redirect('index')

def home_view(request):
    return render(request, 'usuario/index.html')

## AGREGAR SOCIO DESDE ADMIN



    