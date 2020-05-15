import json

from django.contrib.auth import authenticate, login, logout
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
def fortis_bill(request, pk=0):
    response = []
    status = 500
    uid = request.user.id
    if uid is None:
        return JsonResponse({"error": "Not Authorized"}, status=401)
    if request.method == 'POST':
        response, status = post_fortis(request, uid)
    elif request.method == 'GET':
        response, status = get_fortis(uid, pk)
    elif request.method == 'DELETE':
        response, status = del_fortis(uid, pk)
    return JsonResponse(response, safe=False, status=status)


# TODO: Replace with class based views
@csrf_exempt
def hydro_bill(request, pk=0):
    uid = request.user.id
    response = []
    status = 500
    if uid is None:
        return JsonResponse({"error": "Not Authorized"}, status=401)
    if request.method == 'POST':
        response, status = post_hydro(request, uid)
    elif request.method == 'GET':
        response, status = get_hydro(uid, pk)
    elif request.method == 'DELETE':
        response, status = del_hydro(uid, pk)
    return JsonResponse(response, safe=False, status=status)


# TODO: Replace with class based views
@csrf_exempt
def add_commute(request, pk=0):
    uid = request.user.id
    response = []
    status = 500
    if uid is None:
        return JsonResponse({"error": "Not Authorized"}, status=401)
    if request.method == 'POST':
        commute = json.loads(request.body)
        response, status = add_commute_to_db(commute, uid)
    elif request.method == 'GET':
        response, status = get_commute(uid, pk)
    elif request.method == 'DELETE':
        response, status = del_commute(uid, pk)
    return JsonResponse(response, safe=False, status=status)


def get_vehicles_json(request):
    with open('./static/json_files/vehicles.json', 'r') as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)


def calculate_footprint(request):
    uid = request.user.id
    if uid is None:
        return JsonResponse({"error": "Not Authorized"}, status=401)
    response = calculate_footprint_for_user(uid)
    return JsonResponse(response)


@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        username = request.POST['username']
        raw_password = request.POST['password']
        user = authenticate(username=username, password=raw_password)
        if user is None:
            return JsonResponse({"error": "Invalid username or password"}, status=400)
        login(request, user)
        return JsonResponse({"success": "ok"})


def sign_out(request):
    logout(request)
    return JsonResponse({"success": "ok"})


@csrf_exempt
def register(request):
    response = {}
    status = 500
    if request.method == "POST":
        post_data = request.POST.copy()
        username = post_data.get('username', '')
        email = post_data.get('email', '')
        password = post_data.get('password', '')

        # check if user does not exist
        if User.objects.filter(username=username).exists():
            response = {"error": "Username already exists"}
            status = 409

        if User.objects.filter(email=email).exists():
            response = {"error": "Username already exists"}
            status = 409

        else:
            create_new_user = User.objects.create_user(username, email, password)

            create_new_user.save()
            user = authenticate(username=username, password=password)
            login(request, user)
            if create_new_user is not None:
                if create_new_user.is_active:
                    response = {"Success": "ok"}
                    status = 200
                else:
                    response = {"error": "The password is valid, but the account has been disabled!"}
                    status = 503

    return JsonResponse(response, status=status)

