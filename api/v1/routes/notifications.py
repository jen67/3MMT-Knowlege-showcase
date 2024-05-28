from flask import Blueprint, jsonify
from models import Notification, User
from flask_jwt_extended import jwt_required, get_jwt_identity

notifications_bp = Blueprint('notifications', __name__)

@notifications_bp.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    current_user = get_jwt_identity()
    user = User.objects(id=current_user['id']).first()
    notifications = Notification.objects(user=user)
    
    return jsonify(notifications), 200

