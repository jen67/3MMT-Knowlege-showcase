from flask import Blueprint, jsonify, request
from models import Company, Notification, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils import role_required, login_required

notifications_bp = Blueprint('notifications', __name__)


@notifications_bp.route('/notifications', methods=['GET'])
@login_required()
def get_notifications():
    current_user = get_jwt_identity()
    user = User.objects(id=current_user['id']).first()
    notifications = Notification.objects(user=user)

    return jsonify(notifications), 200


@notifications_bp.route('/notifications', methods=['POST'])
@login_required()
@role_required('company')
def send_notification():
    current_user = get_jwt_identity()

    if current_user['role'] != 'company':
        return jsonify({'msg': 'Only companies can send notifications'}), 403

    user = User.objects(id=request.json['user_id']).first()

    if not user:
        return jsonify({'msg': 'User not found'}), 404

    notification = Notification(user=user, content=request.json['content'])
    notification.save()

    return jsonify({'msg': 'Notification sent'}), 200
