from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Job, User

search_bp = Blueprint('search_bp', __name__)


@search_bp.route('/search/jobs', methods=['GET'])
def search_jobs():
    criteria = request.args
    query = Job.objects

    if 'title' in criteria:
        query = query.filter(title__icontains=criteria['title'])

    if 'location' in criteria:
        query = query.filter(location__icontains=criteria['location'])

    jobs = query.all()
    jobs_json = jobs.to_json()

    if not jobs:
        return jsonify({'message': 'No jobs found'}), 404

    return jobs_json, 200

@search_bp.route('/search/talents', methods=['GET'])
def search_talents():
    criteria = request.args
    query = User.objects

    if 'skills' in criteria:
        skills = criteria.getlist('skills')
        query = query.filter(skills__in=skills)

    users = query.all()
    users_json = users.to_json()

    if not users:
        return jsonify({'message': 'No talents found'}), 404

    return users_json, 200


@search_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user = get_jwt_identity()

    if current_user['role'] != 'company':
        return jsonify({"msg": "Permission denied"}), 403
    users = User.objects().to_json()

    return jsonify(users), 200
