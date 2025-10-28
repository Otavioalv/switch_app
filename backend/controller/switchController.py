from flask import jsonify
from model.switchModel import switchModel

class switchController():
    
    def __init__(self):
        print("Controller iniciou")
        self.sw_model = switchModel()
        
    def get_info_ports(self, ip_sw=None):
        try:
            if ip_sw: 
                print("Coleta ip expecifico")
                
                result = self.sw_model.admin_status_ports(ip_sw)
                
                return jsonify({
                    "message": "Informações coletadas com sucesso",
                    "results": [ip_sw, "Ip expecifico"]
                })    
                
                
            # Todos ips
            # Fazer looping repetição todos switchs
            result = self.sw_model.admin_status_ports("172.21.0.19")
            
            return jsonify({
                "message": "Informações coletadas com sucesso",
                "results": [ip_sw]
            })
        except Exception as e:
            print("error: get_info_ports")
            
            return jsonify({
                "message": "Erro interno no servidor",
                "results": []
            })