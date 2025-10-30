from flask import jsonify
from model.switchModel import switchModel
from consts.ip_switch_list import ip_switch_list

import pprint

class switchController():
    
    def __init__(self):
        print("Controller iniciou")
        self.sw_model = switchModel()
        
    def get_info_ports(self, ip_sw=None):
        try:
            if ip_sw: 
                print("Unico ip")
                response = self.__exec_info_ports(ip_sw)
                return jsonify({
                    "message": "Informações coletadas com sucesso",
                    "results": [response]
                })
                
            # Todos ips
            # Fazer looping repetição todos switchs
            # ip_sw = '172.22.0.18'
            response = []
            for ip in ip_switch_list:
                result = self.__exec_info_ports(ip)
                response.append(result)
            
            return jsonify({
                "message": "Informações coletadas com sucesso",
                "results": [response]
            })
        except Exception as e:
            print("error: get_info_ports >>> ", e)
            
            return jsonify({
                "message": "Erro ao coletar dados",
                "results": []
            })
            
    def __exec_info_ports(self, ip_sw):
        try:
            interface_number = self.sw_model.interface_number(ip_sw)
            
            result_admin_status = self.sw_model.admin_status_ports(ip_sw, interface_number)
            result_oper_status = self.sw_model.oper_status_ports(ip_sw, interface_number)
            result_desc_ports = self.sw_model.desc_ports(ip_sw, interface_number)
            result_sys_name = self.sw_model.sys_name(ip_sw)
            
            admin_status = [item[1] for item in result_admin_status]
            oper_status = [item[1] for item in result_oper_status]
            desc_ports = [item[1] for item in result_desc_ports]
            
            joint_interpretation = self.__interpret_blocked_ports(admin_status, oper_status, desc_ports)
            
            # print(list_admin_status, list_oper_status)
            
            
            response = {
                # "admin_status_ports": result_admin_status,
                # "oper_status_port": result_oper_status,
                # "desc_ports": result_desc_ports,
                "ip_switch": ip_sw,
                "switch_name": result_sys_name, 
                "interface_number": interface_number,
                "status_ports": joint_interpretation
            }
            
            return response
        except Exception as e:
            raise Exception("Erro ao coletar dados")
    
    
    # Adicionar essa função na pasta utils
    def __interpret_blocked_ports(self, admin_status, oper_status, desc_ports):
        """ 
            combinação de (ifAdminStatus / ifOperStatus)
            1 / 1 : Porta ativa e operacional.
            1 / 2 : Porta ativada, mas sem link físico (cabo solto, SFP removido, bloqueio de segurança, ou erro físico).
            2 / 2 : Porta desabilitada por configuração (shutdown).
            
            connected	Porta está ativa e com link. 1 = up
            notconnect	Porta sem link físico (sem cabo, ou o dispositivo do outro lado está desligado). 2 = down
            disabled	Porta administrativamente desativada (shutdown). 2 = down, mas ifAdminStatus = 2 (down)
        """
        try:
            status_ports_list = []
            
            pairs = list(zip(admin_status, oper_status, desc_ports))
            
            
            for values in pairs:
                status = "error_identification"
                port = values[2]
                
                if values[0] == '1' and values[1] == '1':
                    status = "connected"
                    # print("Porta ativada", values[2])
                elif values[0] == '1' and values[1] == '2':
                    status = "not_connected"
                    # print("Portas Ativada mas com problema físico", values[2])
                elif values[0] == '2':
                    status = "disabled"
                    # print("Porta adminstrativamente desaticada", values[2])
                
                status_ports = {
                    "status": status,
                    "port": port
                }
                
                status_ports_list.append(status_ports)
                
            return status_ports_list
        except Exception as e:
            print("Teste")