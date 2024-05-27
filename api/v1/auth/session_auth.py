#!/usr/bin/env python3
'''auth module'''

import bcrypt
import uuid
import json
import redis
from typing import Union, Optional
import models.data.mongo_setup as mongo_setup
from models.data.recruiter import Company
from models.data.users import User

mongo_setup.global_init()
# Redis connection
r = redis.Redis(host='localhost', port=6379, db=0)


def _hash_password(password: str) -> str:
    '''hashes a password'''
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode('utf-8')

def _generate_uuid() -> str:
    '''generate a uuid'''
    return str(uuid.uuid4())


class Auth:
    """Auth class to interact with the authentication database using MongoDB and Redis.
    """

    def __init__(self):
        self._redis = r

    def register_user(self, data: dict, is_company: bool) -> Union[User, Company]:
        '''register a user or company'''
        required_fields = ['name', 'email', 'password']
        if is_company:
            required_fields += ['location']

        for field in required_fields:
            if field not in data:
                raise ValueError(f'Missing required field: {field}')

        email = data['email']
        if User.objects(email=email).first() or Company.objects(email=email).first():
            raise ValueError(f'User or Company with email {email} already exists')

        hashed_password = _hash_password(data['password'])

        if is_company:
            company = Company(
                name=data['name'],
                email=data['email'],
                location=data['location'],
                industry=data.get('industry', ''),
                description=data.get('description', ''),
                password=hashed_password,
            )
            company.save()
            self._save_to_redis(company, is_company=True)
            return company
        else:
            user = User(
                name=data['name'],
                email=data['email'],
                mobile=data['mobile'],
                password=hashed_password,
                category=data['category'],
            )
            user.save()
            self._save_to_redis(user, is_company=False)
            return user

    def _save_to_redis(self, user_or_company: Union[User, Company], is_company: bool):
        '''Save user or company data to Redis'''
        user_data = {
            'id': str(user_or_company.id),
            'name': user_or_company.name,
            'email': user_or_company.email,
            'password': user_or_company.password,
            'session_id': user_or_company.session_id,
            'reset_token': user_or_company.reset_token,
            'is_company': is_company
        }
        if is_company:
            user_data.update({
                'location': user_or_company.location,
                'industry': user_or_company.industry,
                'description': user_or_company.description,
            })
        else:
            user_data.update({
                'mobile': user_or_company.mobile,
                'category': user_or_company.category,
            })

        self._redis.set(f"user:{user_or_company.email}", json.dumps(user_data))

    def valid_login(self, email: str, password: str) -> bool:
        '''validate login'''
        user_data = self._redis.get(f"user:{email}")
        if not user_data:
            return False

        user_data = json.loads(user_data)
        return bcrypt.checkpw(password.encode(), user_data['password'].encode())

    def create_session(self, email: str) -> Optional[str]:
        '''create a session for a user or company with session id'''
        user_data = self._redis.get(f"user:{email}")
        if not user_data:
            return None

        user_data = json.loads(user_data)
        session_id = _generate_uuid()
        user_data['session_id'] = session_id
        self._redis.set(f"user:{email}", json.dumps(user_data))

        if user_data['is_company']:
            Company.objects(email=email).update_one(set__session_id=session_id)
        else:
            User.objects(email=email).update_one(set__session_id=session_id)

        return session_id

    def get_user_from_session_id(self, session_id: str) -> Union[User, Company, None]:
        '''get user or company from session id'''
        for key in self._redis.keys('user:*'):
            user_data = self._redis.get(key)
            if user_data:
                user_data = json.loads(user_data)
                if user_data.get('session_id') == session_id:
                    if user_data['is_company']:
                        return Company.objects(id=user_data['id']).first()
                    else:
                        return User.objects(id=user_data['id']).first()
        return None

    def destroy_session(self, email: str) -> None:
        '''destroy a session'''
        user_data = self._redis.get(f"user:{email}")
        if not user_data:
            return

        user_data = json.loads(user_data)
        user_data['session_id'] = None
        self._redis.set(f"user:{email}", json.dumps(user_data))

        if user_data['is_company']:
            Company.objects(email=email).update_one(set__session_id=None)
        else:
            User.objects(email=email).update_one(set__session_id=None)

    def get_reset_password_token(self, email: str) -> str:
        '''generate a reset password token'''
        user_data = self._redis.get(f"user:{email}")
        if not user_data:
            raise ValueError("User not found")

        user_data = json.loads(user_data)
        token = _generate_uuid()
        user_data['reset_token'] = token
        self._redis.set(f"user:{email}", json.dumps(user_data))

        if user_data['is_company']:
            Company.objects(email=email).update_one(set__reset_token=token)
        else:
            User.objects(email=email).update_one(set__reset_token=token)

        return token

    def update_password(self, reset_token: str, password: str) -> None:
        '''update a user password'''
        for key in self._redis.keys('user:*'):
            user_data = self._redis.get(key)
            if user_data:
                user_data = json.loads(user_data)
                if user_data.get('reset_token') == reset_token:
                    hashed_password = _hash_password(password)
                    user_data['password'] = hashed_password
                    user_data['reset_token'] = None
                    self._redis.set(key, json.dumps(user_data))

                    if user_data['is_company']:
                        Company.objects(id=user_data['id']).update_one(set__password=hashed_password, set__reset_token=None)
                    else:
                        User.objects(id=user_data['id']).update_one(set__password=hashed_password, set__reset_token=None)
                    break

    def validate_user_by_session_id(self, session_id: str) -> bool:
        '''validate user by session id'''
        return self.get_user_from_session_id(session_id) is not None

