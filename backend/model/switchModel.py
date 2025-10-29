from utils.smnpCnn import snmp_get
from consts.oids_list import oids_list
import asyncio


class switchModel():
    
    def __init__(self):
        self.public_comm = "1np@net_ro"
        self.private_comm = "1np@net_rw"
        
    def admin_status_ports(self, ip_sw):
        try:
            """ 
                1np@net_ro: public
                1np@net_rw: private
            """
            oid = oids_list[0]["oid"]
            
            print(ip_sw, self.public_comm, oid)
            
            result = asyncio.run(snmp_get(ip_sw, self.public_comm, oid))
            # result = asyncio.run(smnp_get_test(ip_sw, self.public_comm, oid))
            
            print("result: ", result)
            
            return "Dados para retornar"
        except Exception as e: 
            # Retornar erro ou retornar nada
            
            print("Erro ao executar comando >> ", e)
            raise Exception("Erro ao coletar dados")
        