import datetime
import mongoengine as me
from werkzeug.security import generate_password_hash, check_password_hash

class User(me.Document):
    registered_date = me.DateTimeField(default=datetime.datetime.utcnow)
    name = me.StringField(required=True)
    email = me.StringField(required=True, unique=True)
    mobile = me.StringField(required=True)
    password_hash = me.StringField(required=True)
    category = me.StringField(required=True)
    skills = me.ListField(me.StringField())
    session_id = me.StringField()
    reset_token = me.StringField()

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    meta = {
        'collection': 'users'
    }

class Company(me.Document):
    registered_date = me.DateTimeField(default=datetime.datetime.utcnow)
    name = me.StringField(required=True)
    email = me.StringField(required=True, unique=True)
    location = me.StringField(required=True)
    industry = me.StringField()
    description = me.StringField()
    password_hash = me.StringField(required=True)
    session_id = me.StringField()
    reset_token = me.StringField()

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    meta = {
        'collection': 'companies'
    }

class Job(me.Document):
    company = me.ReferenceField(Company, required=True)
    title = me.StringField(required=True)
    description = me.StringField(required=True)
    requirements = me.StringField()
    location = me.StringField()
    posted_date = me.DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'jobs'
    }

class Application(me.Document):
    user = me.ReferenceField(User, required=True)
    job = me.ReferenceField(Job, required=True)
    status = me.StringField(default='submitted')
    applied_date = me.DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'applications'
    }

class Message(me.Document):
    sender = me.ReferenceField(User, required=True)
    receiver = me.ReferenceField(User, required=True)
    content = me.StringField(required=True)
    timestamp = me.DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'messages'
    }

class Notification(me.Document):
    user = me.ReferenceField(User, required=True)
    content = me.StringField(required=True)
    read = me.BooleanField(default=False)
    timestamp = me.DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'notifications'
    }

class Contact(me.Document):
    user = me.ReferenceField(User, required=True)
    query = me.StringField(required=True)
    timestamp = me.DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'contacts'
    }

class StaticContent(me.Document):
    page = me.StringField(required=True)
    content = me.StringField(required=True)

    meta = {
        'collection': 'static_content'
    }

