import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_vehicles_json(request):
    try:
        with open('./static/json_files/vehicles.json', 'r') as file:
            data = json.load(file)
        return JsonResponse(data, safe=False)
    except OSError:
        return JsonResponse({"error": "Could not find data for autocomplete"}, status=404)
