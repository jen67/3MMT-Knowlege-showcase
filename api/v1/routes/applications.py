from flask import Blueprint, request, jsonify
from models import Application, Job, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils import role_required, login_required

applications_bp = Blueprint('applications', __name__)

@applications_bp.route('/applications', methods=['POST'])
@login_required()
@role_required('user')
def apply_job():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.objects(id=current_user['id']).first()
    job = Job.objects(id=data['job_id']).first()

    if not job:
        return jsonify({"msg": "Job not found"}), 404
    
    application = Application(user=user, job=job)
    application.save()

    return jsonify({"msg": "Application submitted successfully"}), 201

@applications_bp.route('/applications/<string:job_id>', methods=['GET'])
@login_required()
@role_required('company')
def get_applications_for_job(job_id):
    current_user = get_jwt_identity()
    job = Job.objects(id=job_id, company=current_user['id']).first()

    if not job:
        return jsonify({"msg": "Job not found"}), 404
    
    applications = Application.objects(job=job)

    return jsonify(applications), 200

@applications_bp.route('/applications/user/<string:user_id>', methods=['GET'])
@login_required()
@role_required('user')
def get_user_applications(user_id):
    current_user = get_jwt_identity()

    if str(current_user['id']) != user_id:
        return jsonify({"msg": "Unauthorized access"}), 403
    
    applications = Application.objects(user=current_user['id'])
    
    return jsonify(applications), 200

