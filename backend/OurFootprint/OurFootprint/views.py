import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from scripts.process_file import process_fortis, process_hydro
from scripts.add_commute import add_commute


def index(request):
    a = {'message': 'Hello world', 'status': 200}
    return JsonResponse(a)


def e2(request):
    a = {'message': 'The second endpoint', 'status': 200}
    return JsonResponse(a)


@csrf_exempt
def fortis_bill(request):
    response = []
    if request.method == 'POST':
        file = request.FILES['fortis']
        response = process_fortis(file, 100)
    return JsonResponse(response, safe=False)


@csrf_exempt
def hydro_bill(request):
    response = []
    if request.method == 'POST':
        file = request.FILES['hydro']
        response = process_hydro(file, 100)
    return JsonResponse(response, safe=False)


@csrf_exempt
def add_commute(request):
    response = []
    if request.method == 'POST':
        commute = json.loads(request.body)
        response = add_commute(commute, 100)
    return JsonResponse(response, safe=False)
