from flask import Blueprint, jsonify, request, make_response
from service.prompt_service import answer_question_for_chapter, get_more_info
from utils.jwt import check_authorization

prompt_blueprint = Blueprint("prompt", __name__, url_prefix="/prompt")


@prompt_blueprint.route("/answer/", methods=["POST"])
def answer_prompt():
    data = request.json
    question = data["question"]
    document_id = data["documentId"]
    chapter = data["chapter"]

    response, status_code = answer_question_for_chapter(question, document_id, chapter)
    return make_response(jsonify(response), status_code)


@prompt_blueprint.route("/info/", methods=["POST"])
def more_info():
    text = request.json["text"]
    response, status_code = get_more_info(text)
    return make_response(jsonify(response), status_code)
