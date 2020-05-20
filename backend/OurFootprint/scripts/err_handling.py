from django.http import JsonResponse


def check_invalid_db_ref(db_ref, uid):
    if db_ref is None:
        return JsonResponse({"error": "Not found"}, status=404)
    elif db_ref.user_id.id != uid:
        return JsonResponse({"error": "Trying to access other user's data"}, status=403)
    else:
        return None
