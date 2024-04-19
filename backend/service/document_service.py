from models.document import Document
from werkzeug.utils import secure_filename
from database import db
import os


def save_file(file, user_id):
    filename = secure_filename(file.filename)
    file_path = os.path.join("./files", filename)
    file.save(file_path)

    new_document = Document(user_id=user_id, file_path=file_path, name=filename)
    db.session.add(new_document)
    db.session.commit()

    return "File uploaded and saved in database successfully", 201


def get_documents(user_id):
    documents = Document.query.filter_by(user_id=user_id).all()
    return [document.serialize() for document in documents]
