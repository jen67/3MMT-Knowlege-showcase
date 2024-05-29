from flask import Blueprint, request, jsonify, make_response
from models import User, Company
from utils import generate_uuid, login_required
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    is_company = data.get('is_company', False)

    if is_company:
        if Company.objects(email=data['email']).first():
            return jsonify({"msg": "Company already registered"}), 400

        company = Company(
            name=data['name'],
            email=data['email'],
            location=data['location'],
            industry=data.get('industry', ''),
            description=data.get('description', ''),
        )

        company.set_password(data['password'])
        company.save()

        return jsonify({"msg": "Company registered successfully"}), 201
    else:
        if User.objects(email=data['email']).first():
            return jsonify({"msg": "User already registered"}), 400

        user = User(
            name=data['name'],
            email=data['email'],
            mobile=data['mobile'],
            category=data['category'],
        )

        user.set_password(data['password'])
        user.save()

        return jsonify({"msg": "User registered successfully"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.objects(email=data['email']).first()

    if user and user.check_password(data['password']):
        access_token = create_access_token(
            identity={"id": str(user.id), "role": "user"})
        response = make_response(jsonify(access_token=access_token), 200)

        response.set_cookie('auth_token', access_token, max_age=86400)

        return response

    company = Company.objects(email=data['email']).first()

    if company and company.check_password(data['password']):
        access_token = create_access_token(
            identity={"id": str(company.id), "role": "company"})
        response = make_response(jsonify(access_token=access_token), 200)

        response.set_cookie('auth_token', access_token, max_age=86400)

        return response

    return jsonify({"msg": "Invalid credentials"}), 401


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    response = make_response(jsonify({"msg": "Logout successful"}), 200)
    response.set_cookie('auth_token', '', expires=0)

    return response


@auth_bp.route('/reset-password', methods=['POST'])
@login_required
def get_reset():
    data = request.get_json()
    email = data.get('email')

    user = User.objects(email=email).first()
    if not user:
        company = Company.objects(email=email).first()
        if not company:
            return jsonify({"msg": "User with this email does not exist"}), 404

    reset_token = generate_uuid()

    if user:
        user.reset_token = reset_token
        user.save()
    else:
        company.reset_token = reset_token
        company.save()

    return jsonify({"reset_token": reset_token}), 200


@auth_bp.route('/update-password', methods=['POST'])
@login_required
def update_password():
    data = request.get_json()
    email = data.get('email')
    reset_token = data.get('reset_token')
    new_password = data.get('new_password')

    user = User.objects(email=email, reset_token=reset_token).first()
    if not user:
        company = Company.objects(email=email, reset_token=reset_token).first()
        if not company:
            return jsonify({"msg": "Invalid email or reset token"}), 400

    if user:
        user.set_password(new_password)
        user.reset_token = None
        user.save()
    elif company:
        company.set_password(new_password)
        company.reset_token = None
        company.save()

    return jsonify({"msg": "Password updated successfully"}), 200


@auth_bp.route('/protected', methods=['GET'])
@login_required
def protected():
    return jsonify({"msg": "This is a protected route."}), 200
