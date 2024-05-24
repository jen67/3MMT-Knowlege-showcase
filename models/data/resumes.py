import datetime
import mongoengine
from .users import User
from .recruiter import Company


class Resume(mongoengine.Document):
    registered_date = mongoengine.DateTimeField(default=datetime.datetime.now)
    user = mongoengine.ReferenceField(User, required=True)
    company = mongoengine.ReferenceField(Company, required=True)
    resume_file = mongoengine.FileField(required=True)
    status = mongoengine.StringField(default='submitted')

    meta = {
        'db_alias': 'core',
        'collection': 'resumes'
    }
