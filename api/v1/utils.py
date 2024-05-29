import uuid
from flask import jsonify, request
from functools import wraps
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from models import User, Company


def generate_uuid():
    return str(uuid.uuid4())


def role_required(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            current_user = get_jwt_identity()

            if current_user['role'] != role:
                return jsonify({"msg": "Permission denied"}), 403

            return fn(*args, **kwargs)

        return wrapper

    return decorator


