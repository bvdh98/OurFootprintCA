from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from scripts.process_file import process_fortis


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
