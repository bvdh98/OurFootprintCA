import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import csrf_exempt

from scripts.dels import del_fortis, del_hydro, del_commute
from scripts.gets import get_fortis, get_hydro, get_commute, get_fortis_with_id, get_hydro_with_id, get_commute_with_id
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
@login_required
def fortis_bill(request, pk=0):
    response = []
    status = 500
    uid = request.user.id
    if request.method == 'POST':
        try:
            file = request.FILES['fortis']
        except MultiValueDictKeyError:
            response = {'error': 'Unexpected key, expected "fortis"'}
            status = 400
        else:
            response = process_fortis(file, uid)
            status = 200
    elif request.method == 'GET':
        if pk == 0:
            response = get_fortis(uid)
        else:
            response = get_fortis_with_id(pk)
    elif request.method == 'DELETE':
        del_fortis(pk)
    return JsonResponse(response, safe=False, status=status)


@csrf_exempt
@login_required
def hydro_bill(request, pk=0):
    uid = request.user.id
    response = []
    status = 500
    if request.method == 'POST':
        try:
            file = request.FILES['hydro']
        except MultiValueDictKeyError:
            response = {'error': 'Unexpected key, expected "hydro"'}
            status = 400
        else:
            response = process_hydro(file, uid)
            status = 200
    elif request.method == 'GET':
        if pk == 0:
            response = get_hydro(uid)
        else:
            response = get_hydro_with_id(pk)
    elif request.method == 'DELETE':
        del_hydro(pk)
    return JsonResponse(response, safe=False, status=status)


@csrf_exempt
@login_required(login_url='/api/signup')
def add_commute(request, pk=0):
    uid = request.user.id
    response = []
    if request.method == 'POST':
        commute = json.loads(request.body)
        response = add_commute_to_db(commute, uid)
    elif request.method == 'GET':
        if pk == 0:
            response = get_commute(uid)
        else:
            response = get_commute_with_id(uid)
    elif request.method == 'DELETE':
        del_commute(pk)
    return JsonResponse(response, safe=False)


def get_vehicles_json(request):
    with open('./static/json_files/vehicles.json', 'r') as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)


def calculate_footprint(request):
    uid = request.user.id
    response = calculate_footprint_for_user(uid)
    return JsonResponse(response)


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        raw_password = request.POST['password']
        user = authenticate(username=username, password=raw_password)
        if user is None:
            return JsonResponse({'Done': 'No'})
        login(request, user)
        return JsonResponse({'Done': 'Yes'})


def signout(request):
    logout(request)
    return JsonResponse({'done': 'y'})


@csrf_exempt
def register(request):
    if request.method == "POST":
        postdata = request.POST.copy()
        username = postdata.get('username', '')
        email = postdata.get('email', '')
        password = postdata.get('password', '')

        # check if user does not exist
        if User.objects.filter(username=username).exists():
            username_unique_error = True

        if User.objects.filter(email=email).exists():
            email_unique_error = True

        else:
            create_new_user = User.objects.create_user(username, email, password)

            create_new_user.save()
            user = authenticate(username=username, password=password)
            login(request, user)
            if create_new_user is not None:
                if create_new_user.is_active:
                    return JsonResponse({'done?': 'y'})
                else:
                    print("The password is valid, but the account has been disabled!")

    return JsonResponse({})

