from flask import Blueprint, jsonify
from models import StaticContent

content_bp = Blueprint('content', __name__)

@content_bp.route('/content/<string:page>', methods=['GET'])
def get_content(page):
    content = StaticContent.objects(page=page).first()

    if not content:
        return jsonify({"msg": "Content not found"}), 404
    
    return jsonify(content), 200

