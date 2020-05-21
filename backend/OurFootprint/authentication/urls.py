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
from . import views

from django.contrib import admin

admin.autodiscover()

# reroute all the requests to users endpoint to the users app
urlpatterns = [
    path('signup/', views.register, name="Signup user"),
    path('logout/', views.sign_out, name="Logout user"),
    path('login/', views.sign_in, name="Sign in user"),
    path('check_login/', views.check_signin, name="Check login"),
]
