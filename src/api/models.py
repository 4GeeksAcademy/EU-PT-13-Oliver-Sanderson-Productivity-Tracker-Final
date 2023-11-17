from flask_sqlalchemy import SQLAlchemy
from hmac import compare_digest
from sqlalchemy import DateTime
import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            # do not serialize the password, its a security breach
        }
    def check_password(self, password):
        return compare_digest(password, self.password)
    
class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime, nullable=False)
    time_spent_secs = db.Column(db.Integer, nullable=False)
    work_time_secs = db.Column(db.Integer, nullable=False)
    fun_time_secs = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String)

    def __repr__(self):
        return f'<Session {self.date}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date": self.date,
            "time_spent_secs": self.time_spent_secs,
            "work_time_secs": self.work_time_secs,
            "fun_time_secs": self.fun_time_secs,
            "url": self.url,
        }
    
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    page_name = db.Column(db.String)
    page_link = db.Column(db.String, nullable=False)
    frequency = db.Column(db.String) #not used
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    reward_name = db.Column(db.String)
    reward_link = db.Column(db.String)
    reward_duration = db.Column(db.Integer)

    def __repr__(self):
        return f'<Task {self.page_name}>' 
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "page_name": self.page_name,
            "page_link": self.page_link,
            # "frequency": self.frequency,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "reward_name" : self.reward_name,
            "reward_link" : self.reward_link,
            "reward_duration" : self.reward_duration,
        }
    
class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    test_value = db.Column(db.String(120), nullable=False)

    Obj3 = datetime.datetime.now()
    todayDate = Obj3.date()
    todayTime = Obj3.time()
    print(Obj3)
    print(todayDate)
    print(todayTime)

    def __repr__(self):
        return f'<Test {self.test_value}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "test_value": self.test_value,
        }