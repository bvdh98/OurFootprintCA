from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse


def sign_in(request):
    # Allow only POST requests to this endpoint
    if request.method != 'POST':
        return JsonResponse({"error": "Can only make POST request to this endpoint"}, status=404)

    username = request.POST['username']
    raw_password = request.POST['password']

    # Check if username-password pair is correct and get an instance of the user
    user = authenticate(username=username, password=raw_password)
    if user is None:
        return JsonResponse({"error": "Username password does not match"}, status=401)

    # Log the user in, ie attach auth headers to the response
    login(request, user)

    return JsonResponse({"Success": "ok"})


def sign_out(request):
    # Allow only POST requests to this endpoint
    if request.method != 'POST':
        return JsonResponse({"error": "Can only make POST request to this endpoint"}, status=404)

    logout(request)
    return JsonResponse({"Success": "ok"})


def register(request):
    response = {}
    status = 500

    # Allow only POST requests to this endpoint
    if request.method != "POST":
        return JsonResponse({}, status=404)

    post_data = request.POST.copy()
    username = post_data.get('username', '')
    email = post_data.get('email', '')
    password = post_data.get('password', '')

    # check if user does not exist
    if User.objects.filter(username=username).exists():
        response = {"error": "Username already exists"}
        status = 409

    elif User.objects.filter(email=email).exists():
        response = {"error": "Email already exists"}
        status = 409

    else:
        create_new_user = User.objects.create_user(username, email, password)
        create_new_user.save()

        # Log the user in rather than redirecting to login page
        user = authenticate(username=username, password=password)
        login(request, user)

        if create_new_user is not None:
            response = {"Success": "ok"}
            status = 200
        else:
            # User created but somehow could not log in
            response = {"error": "Could not authenticate, please login"}

    return JsonResponse(response, status=status)


def check_signin(request):
    val = isinstance(request.user, User)
    return JsonResponse({"status": val})

