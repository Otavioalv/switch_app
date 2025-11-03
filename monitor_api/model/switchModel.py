from utils.snmpCnn import snmp_get, snmp_bulk
from consts.oids_list import oids_list
import asyncio


class switchModel():
    def __init__(self):
        self.public_comm = "1np@net_ro"
        self.private_comm = "1np@net_rw"
        
    # Retorna status administrativos das portas
    def admin_status_ports(self, ip_sw, interface_number):
        try:
            oid = oids_list["ifAdminStatus"]["oid"]
            
            result = asyncio.run(snmp_bulk(ip_sw, self.public_comm, oid, end=interface_number))
            
            # print("result_adin_status Model: ", result_adin_status)
            
            return result
        except Exception as e:
            print("Erro ao executar comando >> ", e)
            # raise Exception("Erro ao coletar dados")
            return []
    
    # Retorar informações de operação da porta
    def oper_status_ports(self, ip_sw, interface_number):
        try:
            oid = oids_list["ifOperStatus"]["oid"]
            result = asyncio.run(snmp_bulk(ip_sw, self.public_comm, oid, end=interface_number))
            # print("result_adin_status Model: ", result_adin_status)
            
            return result
        except Exception as e: 
            print("Erro ao executar comando >> ", e)
            # raise Exception("Erro ao coletar dados")
            return []
        
    # Retorna quantidade de interfaces 
    def interface_number(self, ip_sw):
        try:
            oid = oids_list["ifNumber"]["oid"]
            result = asyncio.run(snmp_get(ip_sw, '1np@net_ro', oid))
            return result
        except Exception as e:
            print("Erro ao executar comando >> ", e)
            # raise Exception("Erro ao coletar dados")
            return ""
    
    # Retorna descrição da porta, com oa nomeclatura
    def desc_ports(self, ip_sw, interface_number) :
        try:
            # ifDesc
            oid = oids_list["ifDesc"]["oid"]
            result = asyncio.run(snmp_bulk(ip_sw, '1np@net_ro', oid, end=interface_number))
            
            return result
        except Exception as e: 
            print("Erro ao executar comando >> ", e)
            # raise Exception("Erro ao coletar dados")
            return []
    
    # Nome do switch/sistema 
    def sys_name(self, ip_sw):
        try:
            oid = oids_list["sysName"]["oid"]
            result = asyncio.run(snmp_get(ip_sw, '1np@net_ro', oid))
            
            return result
        except Exception as e: 
            print("Erro ao executar comando >> ", e)
            # raise Exception("Erro ao coletar dados")
            return ""
    
        