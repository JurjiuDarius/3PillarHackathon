from flask import Blueprint, jsonify, request, make_response
from service import authentication_service
from utils.jwt import check_authorization

login_blueprint = Blueprint("login", __name__, url_prefix="/auth")


@login_blueprint.route("/login/", methods=["POST"])
@check_authorization(role=None)
def login_endpoint():
    data = request.json
    response, status_code = authentication_service.login(data)
    return make_response(jsonify(response), status_code)


@check_authorization(role=None)
@login_blueprint.route("/signup/", methods=["POST"])
def sign_up_endpoint():
    data = request.json
    response, status_code = authentication_service.sign_up(data)
    return make_response(jsonify(response), status_code)
