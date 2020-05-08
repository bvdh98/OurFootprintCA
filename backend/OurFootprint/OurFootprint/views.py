import time

from django.http import JsonResponse
import json
import pandas as pd
from django.views.decorators.csrf import csrf_exempt


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


@csrf_exempt
def fortis_bill(request):
    if request.method == 'POST':
        file = request.FILES['fortisBill']
        data = pd.read_csv(file)
        example = data.iloc[1, 1]
        return JsonResponse({'example': example})
