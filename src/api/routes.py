"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Session, Test
from api.utils import generate_sitemap, APIException
import datetime
from sqlalchemy import delete, update
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity, 
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
            return jsonify(response_body), 400

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
        # "name" : "newName"
        # "email" : "newEmail"
        # }

        # Check request_body has 'id'
        if ('id' in request_body):
            # Check the user exists
            check = User.query.filter(User.id == request_body["id"]).first()
            if check is not None:
                user_to_edit = User.query.filter(User.id == request_body["id"]).first()
                if ('name' in request_body):
                    user_to_edit.name = request_body['name']
                if ('email' in request_body):
                    user_to_edit.email = request_body['email']

                # TODO update the new values to session
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
            check = User.query.filter(User.id == request_body["id"]).first()
            if check is not None:
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
        #     "fun_time" : 400
        # }

        # Check request_body has 'id'
        if ('id' in request_body):
            # Check the user exists
            check = Session.query.filter(Session.id == request_body["id"]).first()
            if check is not None:
                session = Session()
                session_to_edit = Session.query.filter(Session.id == request_body["id"]).first()
                session_to_edit.total_time = request_body['total_time']
                session_to_edit.work_time = request_body['work_time']
                session_to_edit.fun_time = request_body['work_time']

                print(request_body['total_time'])
                print(session_to_edit.total_time)

                # TODO update the new values to session
            else:
                response_body = "Session does not exist"
                return jsonify(response_body), 400

        else:
            response_body = "Missing body content. Needs 'id' of the session to update."
            return jsonify(response_body), 400

    if request.method == "DELETE":
        request_body = request.get_json()
        # Check request_body has 'id'
        if ('user_id' in request_body):
            Session.query.filter(Session.user_id == request_body['user_id']).delete()
            db.session.commit()
        else:
            response_body = "Missing body content. Need 'user_id' of the related sessions to delete."
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
            response_body.append(temp)
    return jsonify(response_body), 200




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

