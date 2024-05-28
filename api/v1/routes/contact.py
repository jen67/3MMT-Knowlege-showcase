from flask import Blueprint, request, jsonify
from models import Contact, User
from flask_jwt_extended import jwt_required, get_jwt_identity

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
@jwt_required()
def submit_query():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.objects(id=current_user['id']).first()
    contact = Contact(user=user, query=data['query'])
    contact.save()
    
    return jsonify({"msg": "Query submitted successfully"}), 201

