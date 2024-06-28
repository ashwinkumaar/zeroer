from config import app
from models.model import User
from flask import request, jsonify, abort
from controllers.controller import UserService
from dto.response import ResponseBodyJSON
from dto.exception import CustomException
from sqlalchemy.exc import IntegrityError


# from extensions import init_mysql, open_rabbitmq_connection


# # Test RabbitMQ Connection
# with open_rabbitmq_connection() as channel:
#     method_frame, header_frame, body = channel.basic_get(
#         queue="analyse-user-queue"
#     )




# # Test RabbitMQ Connection
# with open_rabbitmq_connection() as channel:
#     method_frame, header_frame, body = channel.basic_get(
#         queue="analyse-user-queue"
#     )


@app.route("/welcome", methods=["GET"])
def welcome_app():
    return "Welcome to Global Hackathon Entity Recognition"

@app.route("/retrieveUserName", methods=["GET"])
def get_user_by_name():
    user_service = UserService()
    name = request.args.get("name")
    app.logger.info(f"GET user by {name}")
    
    result = user_service.retrieve_user_by_name(name)
    if result is None:
        abort(404, description=f"User {name} not found.")
    data = result.json()
    manipulated_data = {
        "id": data["id"],
        "name": data["name"],
        "addr": data["addr"],
        "city": data["city"],
        "phone": data["phone"]
    }
    response = ResponseBodyJSON(True, manipulated_data).json()
    return jsonify(response), 200

@app.route("/user", methods=["POST"])
def create_user():
    try:
        user_service = UserService()
        body = request.get_json()
        app.logger.info(f"Create User {body}")
        name = body.get("name")
        addr = body.get("addr")
        city = body.get("city")
        phone = body.get("phone")
        
        existing_user = user_service.retrieve_user_by_name(name)
        if existing_user:
            abort(400, description=f"User with {name} already exists")
        new_user = User()
        new_user.user_name = name
        new_user.user_address = addr
        new_user.user_city = city
        new_user.user_phone = phone
        new_user.process_status = "processing" 
        data = user_service.create(user=new_user).json()
        response = ResponseBodyJSON(True, data).json()
        return jsonify(response), 201
    except IntegrityError as e:
        abort(400, description=f"Database Integrity Error: {e}")
    except Exception as e:
        abort(400, description=str(e))

@app.route("/get_relationships", methods=["GET"])
def get_all_user_relationships():
    app.logger.info("GET all permissions")
    user_service = UserService()
    data = user_service.retrieve_user_relationships()
    return_list = []
    for id, relationship_strings in data:
        relationships = relationship_strings.split(', ')
        return_list.append({"id": id, "relationships": relationships})
    response = ResponseBodyJSON(True, return_list).json()
    print("this is response", response)
    return jsonify(response), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)