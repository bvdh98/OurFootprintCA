import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from scripts.dels import del_fortis, del_hydro, del_commute
from scripts.gets import get_fortis, get_hydro, get_commute
from scripts.posts import post_fortis, post_hydro
from scripts.add_commute import add_commute_to_db
from scripts.calculate_for_user import calculate_footprint_for_user


def index(request):
    a = {'message': 'Hello world', 'status': 200}
    return JsonResponse(a)


def e2(request):
    a = {'message': 'The second endpoint', 'status': 200}
    return JsonResponse(a)


# TODO: Replace with class based views
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


# TODO: Replace with class based views
@csrf_exempt
@login_required(login_url='/api/signup')
def add_commute(request, pk=0):
    uid = request.user.id
    response = []
    if request.method == 'POST':
        commute = json.loads(request.body)
        response = add_commute_to_db(commute, uid)
    elif request.method == 'GET':
        response = get_commute(uid, pk)
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
def sign_in(request):
    if request.method == 'POST':
        username = request.POST['username']
        raw_password = request.POST['password']
        user = authenticate(username=username, password=raw_password)
        if user is None:
            return JsonResponse({'Done': 'No'})
        login(request, user)
        return JsonResponse({'Done': 'Yes'})


def sign_out(request):
    logout(request)
    return JsonResponse({'done': 'y'})


@csrf_exempt
def register(request):
    if request.method == "POST":
        post_data = request.POST.copy()
        username = post_data.get('username', '')
        email = post_data.get('email', '')
        password = post_data.get('password', '')

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

