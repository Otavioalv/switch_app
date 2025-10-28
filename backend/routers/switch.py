from flask import Blueprint, request, jsonify
from controller.switchController import switchController

switch_bp = Blueprint("switch", __name__, url_prefix="/switch")

@switch_bp.route("/test", methods=['GET'])
def test():
    if request.method == "GET":
        # pegar dados request
        print("Teste")
        
        # chamar controller
        
        # retornar valor do controller
        return jsonify({"message": "teste"})
    

@switch_bp.route("/get-blocked-ports/<ip_sw>", methods=["POST"])
@switch_bp.route("/get-blocked-ports", methods=["POST"])    
def get_blocked_ports(ip_sw=None): 
    if request.method == "POST":
        
        switch_crt = switchController()
        result = switch_crt.get_info_ports(ip_sw)
        
        return result