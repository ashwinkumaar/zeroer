from config import app
from models.model import User
from flask import request, jsonify, abort
from controllers.controller import UserService
from dto.response import ResponseBodyJSON
from dto.exception import CustomException
from sqlalchemy.exc import IntegrityError

import json

from extensions import init_mysql, open_rabbitmq_connection


# Test RabbitMQ Connection
with open_rabbitmq_connection() as channel:
    method_frame, header_frame, body = channel.basic_get(
        queue="analyse-user-queue"
    )





@app.route("/welcome", methods=["GET"])
def welcome_app():
    return "Welcome to Global Hackathon Entity Recognition"

@app.route("/retrieve", methods=["GET"])
def get_users():
    user_service = UserService()
    name = request.args.get("name")
    address = request.args.get("address")
    city = request.args.get("city")
    phone = request.args.get("phone")
    app.logger.info(f"GET user by {name}")
    result = user_service.retrieve_user_by_records(name, address, city, phone)
    if result is None:
        abort(404, description=f"User {name} not found.")
    data = result.json()
    print("this is data", data)
    manipulated_data = {
        "id": data["id"],
        "name": data["name"],
        "address": data["addr"],
        "city": data["city"],
        "phone": data["phone"],
        "process_status": data["process_status"]
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
        
        
        # existing_user = user_service.retrieve_user_by_records(name, addr, city, phone)
        # print(city)
        # if existing_user:
            # abort(400, description=f"User with {name} already exists")
        new_user = User()
        new_user.user_name = name
        new_user.user_address = addr
        new_user.user_city = city
        new_user.user_phone = phone
        new_user.process_status = "processing" 
        user_data = user_service.create(user=new_user)

        # print(data)
        # msg = {
        #     "user"
        # }
        
        data = {"id": user_data.id, "name": user_data.user_name, 
                "addr": user_data.user_address, 
                "city": user_data.user_city, 
                "phone": user_data.user_phone}
        # print("DATA", data)
        msg_str = json.dumps(data)
        # print("msg_str", msg_str)
        # Push to MQ
        try:
            with open_rabbitmq_connection() as channel:
                channel.basic_publish(
                    exchange="amq.direct",
                    routing_key="analyse-user",
                    # body="abc",
                    body=msg_str,
                )
                print("success rabbitmq")
        except Exception as e:
            print(e)
            abort(400, description=f"RabbitMQ Error: {e}")


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