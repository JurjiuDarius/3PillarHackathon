from database import db


class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    file_path = db.Column(db.String, nullable=False)
    user = db.relationship("User", back_populates="documents")

    def __init__(self, user_id, file_path, name):
        self.user_id = user_id
        self.file_path = file_path
        self.name = name

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
        }
