from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# TODO: Replace with class based views
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from scripts.gets import get_fortis


@csrf_exempt
@login_required
def fortis_bill(request, pk=0):
    response = []
    status = 500
    uid = request.user.id
    if request.method == 'POST':
        response, status = post_fortis(request, uid)
    elif request.method == 'GET':
        response = get_fortis(uid, pk)
    elif request.method == 'DELETE':
        del_fortis(pk)
    return JsonResponse(response, safe=False, status=status)


class FortisBill(View):
    def get(self, request, pk=None):
        response = get_fortis(uid, pk)


# TODO: Replace with class based views
@csrf_exempt
@login_required
def hydro_bill(request, pk=0):
    uid = request.user.id
    response = []
    status = 500
    if request.method == 'POST':
        response, status = post_hydro(request, uid)
    elif request.method == 'GET':
        response = get_hydro(uid, pk)
    elif request.method == 'DELETE':
        del_hydro(pk)
    return JsonResponse(response, safe=False, status=status)

