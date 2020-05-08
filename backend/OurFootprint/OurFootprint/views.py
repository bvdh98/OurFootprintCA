from django.http import JsonResponse
import json


def index(request):
    a = {'message': 'Hello world', 'status': 200}
    return JsonResponse(a)


def e2(request):
    a = {'message': 'The second endpoint', 'status': 200}
    return JsonResponse(a)


def get_vehicles_json(request):
    with open('./static/json_files/vehicles.json', 'r') as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)


def fortis_bill(request):
    if request.method == 'POST':
        file = request.FILES
        print(file)
    return {'status': 200}
