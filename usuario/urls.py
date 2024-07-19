from django.urls import path
from .views import crud, usuarioAdd,usuario_del, usuario_findEdit, usuarioUpdate, index, checkout, contacto, crearUsuario, inicioSesion, producto, quienesSomos, servicio, productoAdd, producto_del, producto_findEdit, productoUpdate, crudProducto 
from django.contrib.auth import views as auth_views
from .views import registro
from . import views
urlpatterns = [
    path('crud',crud, name='crud'),
    path('usuarioAdd',usuarioAdd, name='usuarioAdd'),
    path('usuario_del/<str:pk>',usuario_del,name='usuario_del'),
    path('usuario_findEdit/<str:pk>',usuario_findEdit, name='usuario_findEdit'),
    path('usuarioUpdate',usuarioUpdate, name='usuarioUpdate'),
    path('checkout',checkout, name='checkout'),
    path('contacto',contacto, name='contacto'),
    path('crearUsuario',crearUsuario, name='crearUsuario'),
    path('inicioSesion',inicioSesion, name='inicioSesion'),
    path('producto',producto, name='producto'),
    path('quienesSomos',quienesSomos, name='quienesSomos'),
    path('servicio',servicio, name='servicio'),
    path('index',index, name='index'),
    path('productoAdd',productoAdd, name='productoAdd'),
    path('producto_del/<str:pk>',producto_del, name='producto_del'),
    path('producto_findEdit/<str:pk>',producto_findEdit, name='producto_findEdit'),
    path('productoUpdate',productoUpdate, name='productoUpdate'),
    path('crudProducto',crudProducto, name='crudProducto'),
    path('logout', auth_views.LogoutView.as_view(), name='logout'),
    path('login/', views.login_view, name='login'),
    path('registro/', registro, name='registro'),
    path('loginUsuario/', views.login_view, name='loginUsuario')

]