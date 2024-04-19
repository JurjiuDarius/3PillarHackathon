import hashlib
from models.user import User
from utils.jwt import create_token
from database import db


def login(data):
    email = data.get("email")
    password = data.get("password")

    query_class = User

    user = query_class.query.filter_by(email=email).first()

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if not hashed_password == user.password:
        return {"message": "Incorrect password!"}, 401
    token = create_token(user.id)
    return {"token": token, "user": user.serialize()}, 200


def sign_up(data):
    user = data.get("user")
    username = (user.get("username"),)
    password = user.get("password")
    email = user.get("email")
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    user = User.query.filter_by(email=email).first()
    if user:
        return {"message": "User already exists!"}, 409

    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
    )
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User created successfully!"}, 201
