import datetime
import mongoengine


class Company(mongoengine.Document):
    company_id = mongoengine.SequenceField(primary_key=True)
    registered_date = mongoengine.DateTimeField(default=datetime.datetime.now)
    name = mongoengine.StringField(required=True)
    email = mongoengine.StringField(required=True)
    location = mongoengine.StringField(required=True)
    industry = mongoengine.StringField()
    description = mongoengine.StringField()

    meta = {
        'db_alias': 'core',
        'collection': 'companies'
    }
