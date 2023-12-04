"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Session, Task, Test, StatisticTaskGenerator, Enquiries
from api.utils import generate_sitemap, APIException
import datetime
from sqlalchemy import delete, update
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity, current_user
)

api = Blueprint('api', __name__)

@api.route('/token', methods=['POST'])
def handle_token():
    # Process the information coming from the client
    user_data = request.get_json()
    
    user = User.query.filter_by(email=user_data["email"]).first()

    if not user or not user.check_password(user_data["password"]):
        return jsonify( {"message": "Wrong username or password"}), 401
    
    # Returns token that can be saved in local storage.
    access_token = create_access_token(identity=user.serialize())
    return jsonify(access_token=access_token)

# users and sessions now require a token to access.
# Example of how fetch might look with authorization:
# fetch(URL + "/api/sessions", {
# 				method: "GET",
# 				headers: {"Authorization": "Bearer " + token}
# 			})
# 			.then((recieved) => recieved.json())
# 			.then((data) => {
# 				return data
# 			})
# 			.catch((error) => console.log(error))

@api.route('/signup', methods=['POST'])
def handle_signup():
        
        # Example POST body:
        # {
        # "name" : "Fname",
        # "last_name" : "Lname",
        # "email" : "test343@test343.com",
        # "password" : "1234"
        # }

        request_body = request.get_json()
        # Check request_body has all required fields
        if ('name' in request_body and 'email' in request_body and 'password' in request_body):
            new_user = User()
            new_user.name = request_body["name"]
            new_user.last_name = request_body["last_name"]
            new_user.email = request_body["email"]
            new_user.password = request_body["password"]
            new_user.is_active = True

            db.session.add(new_user)
            db.session.commit()

            response_body = "User created"
            return jsonify(response_body), 200

        else: 
            response_body = "Missing body content"
            return jsonify(response_body), 400



@api.route('/users', methods=['GET', 'DELETE', 'PUT'])
@jwt_required()
def handle_users():

    if request.method == "PUT":
        request_body = request.get_json()

        # Example PUT body:
        # {
        # "id" : 1,
        # "name" : "newName",
        # "last_name" : "newLastName",
        # "email" : "newEmail"
        # }

        # Check request_body has 'id'
        if ('id' in request_body):
            # Check the user exists
            user_to_edit  = User.query.filter(User.id == request_body["id"]).first()
            if user_to_edit  is not None:
                if ('name' in request_body):
                    user_to_edit.name = request_body['name']
                if ('last_name' in request_body):
                    user_to_edit.last_name = request_body['last_name']
                if ('email' in request_body):
                    user_to_edit.email = request_body['email']
                
                db.session.commit()

                response_body = []
                temp = {}
                temp["id"] = (user_to_edit.id)
                temp["name"] = (user_to_edit.name)
                temp["last_name"] = (user_to_edit.last_name)
                temp["email"] = (user_to_edit.email)

                response_body.append(temp)
                return jsonify(response_body), 200

            else:
                response_body = "User does not exist"
                return jsonify(response_body), 400

        else:
            response_body = "Missing body content. Needs 'id' of the user to update."
            return jsonify(response_body), 400

    if request.method == "DELETE":
        request_body = request.get_json()

        # Example DELETE body:
        # {
        # "id" : 1
        # }

        # Check request_body has 'id'
        if ('id' in request_body):

            # Check the user exists
            user_to_delete  = User.query.filter(User.id == request_body["id"]).first()
            if user_to_delete is not None:
                # First delete related sessions
                Session.query.filter(Session.user_id == request_body["id"]).delete()
                # Then delete user
                User.query.filter(User.id == request_body["id"]).delete()
                db.session.commit()

                response_body = "User deleted"
                return jsonify(response_body), 200
            else:
                response_body = "User does not exist"
                return jsonify(response_body), 401
            
        else: 
            response_body = "Missing body content. Need 'id' of the user to delete."
            return jsonify(response_body), 400

    users = User.query.all()

    response_body = []
    for user in users:
        temp_user = {}
        temp_user["id"] = (user.id)
        temp_user["name"] = (user.name)
        temp_user["last_name"] = (user.last_name)
        temp_user["email"] = (user.email)

        response_body.append(temp_user)
    return jsonify(response_body), 200

@api.route('/sessions', methods=['GET', 'POST', 'PUT', 'DELETE'])
@jwt_required()
def handle_sessions():

    if request.method == "PUT":
        print("PUT")
        request_body = request.get_json()

        # Example PUT body:
        # {
        #     "id" : 23,
        #     "total_time" : 1000,
        #     "work_time" : 600,
        #     "fun_time" : 400,
        #     "url" : "http:youtube.com/1234"
        # }

        # Check request_body has 'id'
        if ('id' in request_body):
            # Check the user exists
            session_to_edit = Session.query.filter(Session.id == request_body["id"]).first()
            if session_to_edit is not None:
                session_to_edit.time_spent_secs = request_body['total_time']
                session_to_edit.work_time_secs = request_body['work_time']
                session_to_edit.fun_time_secs = request_body['fun_time']
                session_to_edit.url = request_body['url']
                db.session.commit()

                response_body = []
                temp = {}
                temp["id"] = (session_to_edit.id)
                temp["user_id"] = (session_to_edit.user_id)
                temp["time_spent"] = (session_to_edit.time_spent_secs)
                temp["fun_time"] = (session_to_edit.fun_time_secs)
                temp["work_time"] = (session_to_edit.work_time_secs)
                temp["date"] = (session_to_edit.date)
                temp["url"] = (session_to_edit.url)
                response_body.append(temp)
                return jsonify(response_body), 200

            else:
                response_body = "Session does not exist"
                return jsonify(response_body), 400

        else:
            response_body = "Missing body content. Needs 'id' of the session to update."
            return jsonify(response_body), 400

    if request.method == "DELETE":
        request_body = request.get_json()
        # Check request_body has 'id' or 'user_id' (if provided 'user_id' it will delete all related to user.)
        if ('user_id' in request_body):
            Session.query.filter(Session.user_id == request_body['user_id']).delete()
            db.session.commit()
        elif ('id' in request_body):
            Session.query.filter(Session.id == request_body['id']).delete()
            db.session.commit()
        else:
            response_body = "Missing body content. Need 'user_id' or 'id' of the related session(s) to delete."
            return jsonify(response_body), 400


    if request.method == "POST":

        # Example POST body:
        # {
        #     "current_user_id" : 3,
        #     "total_time" : 1000,
        #     "work_time" : 600,
        #     "fun_time" : 400
        # }

        # Process the information coming from the client
        request_body = request.get_json()
        
        # Check request_body has all required fields
        # TODO check current_user_id exists in User
        if ('current_user_id' in request_body and 'total_time' in request_body and 'work_time' in request_body and 'fun_time' in request_body):

            session = Session()
            session.user_id = request_body["current_user_id"]
            session.date = datetime.datetime.now()
            session.time_spent_secs = request_body["total_time"]
            session.work_time_secs = request_body["work_time"]
            session.fun_time_secs = request_body["fun_time"]
            session.url = request_body["url"]

            db.session.add(session)
            db.session.commit()

        else: 
            response_body = "Missing body content"
            return jsonify(response_body), 400


    # What is sent on GET or successful POST / DELETE
    response_body = []
    results = Session.query.all()
    for index, result in enumerate(results):
            temp = {}
            temp["id"] = (result.id)
            temp["user_id"] = (result.user_id)
            temp["time_spent"] = (result.time_spent_secs)
            temp["fun_time"] = (result.fun_time_secs)
            temp["work_time"] = (result.work_time_secs)
            temp["date"] = (result.date)
            temp["url"] = (result.url)
            response_body.append(temp)
    return jsonify(response_body), 200


@api.route('/tasks', methods=['GET', 'POST', 'DELETE'])
@jwt_required()
def handle_tasks():

    if request.method == "DELETE":
        request_body = request.get_json()

        # Example DELETE body:
        # {
        # "id" : 1
        # }

        # Check request_body has 'id'
        if ('id' in request_body):

            # Check the user exists
            task_to_delete  = Task.query.filter(Task.id == request_body["id"]).first()
            if task_to_delete is not None:
                Task.query.filter(Task.id == request_body["id"]).delete()
                db.session.commit()

                response_body = "Task deleted"
                return jsonify(response_body), 200
            else:
                response_body = "Task does not exist"
                return jsonify(response_body), 401
            
        else: 
            response_body = "Missing body content. Need 'id' of the task to delete."
            return jsonify(response_body), 400



    if request.method == "POST":

        # Example POST body:
        # {
        #     "user_id" : 1,
        #     "page_name" : "The page",
        #     "page_link" : "URL.com",
        #     "frequency" : "daily",
        #     "task_time" : 300,
        #     "start_date" : "1000-01-01 00:00:00",
        #     "end_date" : "9999-12-31 23:59:59",
        #     "reward_name" : "Play Game",
        #     "reward_link" : "www.games.com",
        #     "reward_duration" : 300
        # }

        request_body = request.get_json()
        # Check request_body has all required fields
        if ('user_id' in request_body and 'page_name' in request_body and 'page_link' in request_body and 'task_time' in request_body and 'start_date' in request_body and 'end_date' in request_body and 'reward_duration' in request_body and 'reward_name' in request_body and 'reward_link' in request_body):
            new_task = Task()
            new_task.user_id = request_body["user_id"]
            new_task.page_name = request_body["page_name"]
            new_task.page_link = request_body["page_link"]
            new_task.task_time = request_body["task_time"]
            new_task.frequency = "Once"
            new_task.start_date = request_body["start_date"]
            new_task.end_date = request_body["end_date"]
            new_task.reward_name = request_body["reward_name"]
            new_task.reward_link = request_body["reward_link"]
            new_task.reward_duration = request_body["reward_duration"]

            db.session.add(new_task)
            db.session.commit()

            response_body = "Task created"
            return jsonify(response_body), 200

        else: 
            response_body = "Missing body content"
            return jsonify(response_body), 400
    


    response_body = []
    results = Task.query.all()
    for index, result in enumerate(results):
            temp = {}
            temp["id"] = (result.id)
            temp["user_id"] = (result.user_id)
            temp["page_name"] = (result.page_name)
            temp["page_link"] = (result.page_link)
            temp["task_time"] = (result.task_time)
            # temp["frequency"] = (result.frequency)
            temp["start_date"] = (result.start_date)
            temp["end_date"] = (result.end_date)
            temp["reward_name"] = (result.reward_name)
            temp["reward_link"] = (result.reward_link)
            temp["reward_duration"] = (result.reward_duration)
            response_body.append(temp)
    return jsonify(response_body), 200


@api.route('/me/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    print("HELLO HELLO")
    serialized_tasks = list(map(lambda t: t.serialize(), current_user.tasks))
    
    return jsonify(serialized_tasks), 200

@api.route('/tasks/<int:task_id>/statistics', methods=['GET'])
def calculate_task_statistics(task_id):
    print(task_id)
    statistics =  StatisticTaskGenerator(task_id).calculate_statistic(task_id)
    return jsonify(statistics), 200


@api.route('/test', methods=['GET', 'DELETE'])
def handle_tests():

    if request.method == "DELETE":
            Test.query.filter_by(test_value = "Sausage").delete()
            db.session.commit()
            response_body = "Deleted all!"

    if request.method == "GET":
         
        # We create an instance without being recorded in the database
        testA = Test()
        testA.test_value = "Sausage"

        # We tell the database we want to record this user
        db.session.add(testA)
        db.session.commit()

        tests = Test.query.all()

        response_body = {}



        for index, testers in enumerate(tests):
            response_body["value" + str(index)] = (testers.test_value)

    return jsonify(response_body), 200

@api.route('/contactus', methods=['POST'])
def handle_contactus():
        
      

        request_body = request.get_json() 
        # Check request_body has all required fields
        if ('email' in request_body and 'message' in request_body ):
            new_enquiries = Enquiries()
            new_enquiries.email = request_body["email"]
            new_enquiries.message = request_body["message"]
            
            new_enquiries.is_active = True

            db.session.add(new_enquiries)
            db.session.commit()

            response_body = "Enquiry Submitted"
            return jsonify(response_body), 400

        else: 
            response_body = "Missing body content"
            return jsonify(response_body), 400
