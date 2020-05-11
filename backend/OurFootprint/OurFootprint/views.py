import json
from django.http import JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import csrf_exempt
from scripts.process_file import process_fortis, process_hydro
from scripts.add_commute import add_commute_to_db
from scripts.calculate_for_user import calculate_footprint_for_user


def index(request):
    a = {'message': 'Hello world', 'status': 200}
    return JsonResponse(a)


def e2(request):
    a = {'message': 'The second endpoint', 'status': 200}
    return JsonResponse(a)


@csrf_exempt
def fortis_bill(request):
    response = []
    status = 500
    if request.method == 'POST':
        try:
            file = request.FILES['fortis']
        except MultiValueDictKeyError:
            response = {'error': 'Unexpected key, expected "fortis"'}
            status = 400
        else:
            response = process_fortis(file, 100)
            status = 200
    return JsonResponse(response, safe=False, status=status)


@csrf_exempt
def hydro_bill(request):
    response = []
    status = 500
    if request.method == 'POST':
        try:
            file = request.FILES['hydro']
        except MultiValueDictKeyError:
            response = {'error': 'Unexpected key, expected "hydro"'}
            status = 400
        else:
            response = process_hydro(file, 100)
            status = 200
    return JsonResponse(response, safe=False, status=status)


@csrf_exempt
def add_commute(request):
    response = []
    if request.method == 'POST':
        commute = json.loads(request.body)
        response = add_commute_to_db(commute, 100)
    return JsonResponse(response, safe=False)


def get_vehicles_json(request):
    with open('./static/json_files/vehicles.json', 'r') as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)
