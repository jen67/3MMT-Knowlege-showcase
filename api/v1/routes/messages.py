from flask import Blueprint, request, jsonify
from models import Message, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils import generate_uuid, login_required

messages_bp = Blueprint('messages', __name__)


@messages_bp.route('/messages', methods=['POST'])
@login_required()
def send_message():
    data = request.get_json()
    current_user = get_jwt_identity()
    sender = User.objects(id=current_user['id']).first()
    receiver = User.objects(id=data['receiver_id']).first()

    if not receiver:
        return jsonify({"msg": "Receiver not found"}), 404

    conversation_id = generate_uuid()

    message = Message(sender=sender, receiver=receiver,
                      content=data['content'], conversation_id=conversation_id)
    message.save()

    return jsonify({"msg": "Message sent successfully", "conversation_id": conversation_id}), 201


@messages_bp.route('/messages/<string:conversation_id>', methods=['GET'])
@login_required()
def get_messages(conversation_id):
    messages = Message.objects(conversation_id=conversation_id).to_json()

    return jsonify(messages), 200
