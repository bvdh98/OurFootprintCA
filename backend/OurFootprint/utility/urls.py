"""back_end URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.urls import path
from .views import bc_hydro, fortis_bc

from django.contrib import admin

admin.autodiscover()

# reroute all the requests to users endpoint to the users app
urlpatterns = [
    path('fortis/', fortis_bc.FortisBill.as_view(), name='all_fortis'),
    path('fortis/<int:pk>/', fortis_bc.FortisBill.as_view(), name='single_fortis'),
    path('hydro/', bc_hydro.HydroBill.as_view(), name='all_hydro'),
    path('hydro/<int:pk>/', bc_hydro.HydroBill.as_view(), name='single_hydro'),
]
