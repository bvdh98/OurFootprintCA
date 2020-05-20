# Project level decorators
from django.http import JsonResponse


def login_required(function):
    def wrapper(request, *args, **kw):
        user = request.user
        if not user.id:
            return JsonResponse({"error": "Please log in to access resource"}, status=401)
        else:
            return function(request, *args, **kw)
    return wrapper
