from django.http import JsonResponse
import json


def index(request):
    a = {'message': 'Hello world', 'status': 200}
    return JsonResponse(a)


def e2(request):
    a = {'message': 'The second endpoint', 'status': 200}
    return JsonResponse(a)


def send_json(request):
    # url = staticfiles_storage.url('json_files/car_names.json')
    # file_path = os.path.join(settings.STATIC_URL, 'json_files/car_names.json')
    with open('./static/json_files/vehicles.json', 'r') as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)
