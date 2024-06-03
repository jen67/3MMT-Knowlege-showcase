from flask import request, jsonify, Blueprint
from models import Job, User"

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

