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
from django.conf.urls import url
from django.urls import path, include
from django.contrib import admin

from vehicle import views as vehicle_views
from . import views

admin.autodiscover()

# reroute all the requests to users endpoint to the users app
urlpatterns = [
    path('api/utility/', include('utility.urls')),
    path('api/commute/', include('commute.urls')),
    path('api/user/', include('authentication.urls')),
    path('api/vehicles/', vehicle_views.get_vehicles_json),
    path('api/calculate/', views.calculate_footprint),

    # TODO: Remove for production
    url(r'^admin/', admin.site.urls),
]
