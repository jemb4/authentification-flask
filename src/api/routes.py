"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, if you want to sign up or login look the navbar"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user_check = User.query.filter_by(email=body['email']).first()
    if user_check != None:
        raise APIException('Invalid email or password')
    if user_check == "":
        raise ApiException('Invalid email or password')

    user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(user)
    

    data = {
        'email': user.email,
        'user_id': user.id
    }
    token = create_access_token(identity=data)
    db.session.commit()
    return jsonify(token)


@api.route('/login', methods=['POST'])
def log_in():
    body = request.get_json()
    email = body["email"]
    password = body['password']
    user = User.query.filter_by(email=email).first()

    if user is None:
        raise APIException('Usuario no encontrado')
    if user.password != password:
        raise APIException('Clave incorrecta')

    data = {
        'email': user.email,
        'user_id': user.id
    }
    token = create_access_token(identity=data)
    return jsonify(token)


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id, "email": user.email})

