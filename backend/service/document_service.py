from models.document import Document
from service.prompt_service import get_chapter_titles
from werkzeug.utils import secure_filename
from database import db
import os


def save_file(file, user_id):
    filename = secure_filename(file.filename)
    document = Document.query.filter_by(name=filename).all()
    if document:
        return "File already exists", 409
    file_path = os.path.join("./files", filename)
    file.save(file_path)

    new_document = Document(user_id=user_id, file_path=file_path, name=filename)
    db.session.add(new_document)
    db.session.commit()

    return "File uploaded and saved in database successfully", 201


def get_documents_for_user(user_id):
    documents = Document.query.filter_by(user_id=user_id).all()
    return [document.serialize() for document in documents]


def get_chapters_for_document(user_id, document_id):
    document = Document.query.filter_by(id=document_id).first()
    if not document:
        return "Document not found", 404
    if document.user_id != user_id:
        return "Unauthorized", 401

    chapter_titles = get_chapter_titles(document.file_path)
    return chapter_titles, 200
