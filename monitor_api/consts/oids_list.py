# oids_list = [
#     {
#         "name": "ifAdminStatus" ,
#         "oid": "1.3.6.1.2.1.2.2.1.7",
#         "description": "Indica o estado desejado da interface, ou seja, se ela está administrativamente ativada ou desativada."
#     },
#     {
#         "name": "ifOperStatus" ,
#         "oid": "1.3.6.1.2.1.2.2.1.8",
#         "description": "Indica o estado operacional atual da interface. Ele reflete a situação real, que pode ser diferente do estado administrativo."
#     },
#     {
#         "name": "ifDesc" ,
#         "oid": "1.3.6.1.2.1.2.2.1.2",
#         "description": "informações da nomenclatura das portas"
#     },
#     {
#         "name": "sysName",
#         "oid": "1.3.6.1.2.1.1.5.0" ,
#         "description": "Nome do switch"
#     },
#     {
#         "name": "ifNumber", 
#         "oid": "1.3.6.1.2.1.2.1.0",
#         "description": "Retorna o numero de interfaces switch"
#     }
# ]


oids_list = {
        "ifAdminStatus": {
            "oid": "1.3.6.1.2.1.2.2.1.7",
            "description": "Indica o estado desejado da interface, ou seja, se ela está administrativamente ativada ou desativada."
        },
        "ifOperStatus": {
            "oid": "1.3.6.1.2.1.2.2.1.8",
            "description": "Indica o estado operacional atual da interface. Ele reflete a situação real, que pode ser diferente do estado administrativo."
        },
        "ifDesc": {
            "oid": "1.3.6.1.2.1.2.2.1.2",
            "description": "informações da nomenclatura das portas"
        },
        "sysName": {
            "oid": "1.3.6.1.2.1.1.5.0" ,
            "description": "Nome do switch"
        },
        "ifNumber": {
            "oid": "1.3.6.1.2.1.2.1.0",
            "description": "Retorna o numero de interfaces switch"
        },
        "ifIndex": {
            "oid": "1.3.6.1.2.1.2.2.1.1",
            "description": "Número que identifica de forma única cada interface na tabela"
        }
    }
