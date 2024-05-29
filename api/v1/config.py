import os
from datetime import timedelta


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'mr')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'west')
    MONGODB_SETTINGS = {
        'db': 'job_portal',
        'host': 'localhost',
        'port': 27017
    }
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
