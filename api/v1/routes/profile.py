from flask import Blueprint, request, jsonify
from models import User, Company
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile/<string:id>', methods=['GET'])
@jwt_required()
def get_profile(id):
    user = User.objects(id=id).first()

    if user:
        return jsonify(user), 200
    
    company = Company.objects(id=id).first()

    if company:
        return jsonify(company), 200
    
    return jsonify({"msg": "Profile not found"}), 404

@profile_bp.route('/profile/<string:id>', methods=['PUT'])
@jwt_required()
def update_profile(id):
    data = request.get_json()
    user = User.objects(id=id).first()

    if user:
        user.update(**data)
        return jsonify({"msg": "User profile updated"}), 200
    
    company = Company.objects(id=id).first()

    if company:
        company.update(**data)
        return jsonify({"msg": "Company profile updated"}), 200
    
    return jsonify({"msg": "Profile not found"}), 404

