import datetime
import jwt
import os


def generate_access_token(user):
    payload = {
        'user_id': user.id,
        "isAdmin": user.is_admin,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=60),
        'iat': datetime.datetime.utcnow(),
    }
    token = jwt.encode(payload, os.getenv('SECRET_KEY'), algorithm='HS256')

    return token


def generate_refresh_token(user):
    refresh_payload = {
        'user_id': user.id,
        "isAdmin": user.is_admin,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow(),
    }
    refresh_token = jwt.encode(
        refresh_payload, os.getenv('REFRESH_TOKEN'), algorithm='HS256')

    return refresh_token
