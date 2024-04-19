from service.document_service import save_file
from flask import Blueprint, request, jsonify, make_response
from utils.jwt import get_user_id_from_token

document_blueprint = Blueprint("document", __name__, url_prefix="/document")


@document_blueprint.route("/upload/", methods=["POST"])
def upload_document():
    file = request.files["file"]
    token = request.headers.get("Authorization").split(" ")[1]
    user_id = get_user_id_from_token(token)

    response, status_code = save_file(file, user_id)
    return make_response(jsonify(response), status_code)
