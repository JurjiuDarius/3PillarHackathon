from sqlalchemy import Enum
from database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)

    def __init__(self, email, password, username):
        self.email = email
        self.password = password
        self.username = username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
        }
