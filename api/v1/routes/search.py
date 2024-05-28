from flask import Blueprint, request, jsonify
from models import Job, User

search_bp = Blueprint('search', __name__)

@search_bp.route('/search/jobs', methods=['GET'])
def search_jobs():
    criteria = request.args
    query = Job.objects

    if 'title' in criteria:
        query = query.filter(title__icontains=criteria['title'])

    if 'location' in criteria:
        query = query.filter(location__icontains=criteria['location'])

    jobs = query.all()

    return jsonify(jobs), 200

@search_bp.route('/search/talents', methods=['GET'])
def search_talents():
    criteria = request.args
    query = User.objects

    if 'skills' in criteria:
        skills = criteria.getlist('skills')
        query = query.filter(skills__in=skills)

    users = query.all()
    
    return jsonify(users), 200

