from django.utils.datastructures import MultiValueDictKeyError

from scripts.process_file import process_fortis, process_hydro


def post_fortis(request, uid):
    response = []
    status = 500
    try:
        file = request.FILES['fortis']
    except MultiValueDictKeyError:
        response = {'error': 'Unexpected key, expected "fortis"'}
        status = 400
    else:
        response = process_fortis(file, uid)
        status = 200
    return response, status


def post_hydro(request, uid):
    try:
        file = request.FILES['hydro']
    except MultiValueDictKeyError:
        response = {'error': 'Unexpected key, expected "hydro"'}
        status = 400
    else:
        response = process_hydro(file, uid)
        status = 200
    return response, status
