import asyncio
from pysnmp.hlapi.v3arch.asyncio import *
import pprint

# snmpwalk -v2c -c public 192.168.x.x
# oid (1.3.6.1.2.1) Descrição aparelho

async def snmp_get(host, community, oid):
    try:
        snmpEngine = SnmpEngine()
        port = 161
        iterator = get_cmd(snmpEngine,
                CommunityData(community, mpModel=0),
                await UdpTransportTarget.create((host, port)),
                ContextData(),
                ObjectType(ObjectIdentity(oid)))
        
        
        errorIndication, errorStatus, errorIndex, varBinds = await iterator

        if errorIndication:
            # print(f"snmp_get ERROR >>> {errorIndication}\n")
            return None
        elif errorStatus:
            # print(f'snmp_get ERROR >>> {errorStatus.prettyPrint()} at {errorIndex and varBinds[int(errorIndex) - 1][0] or "?"} \n')
            
            return None
        else:
            for varBind in varBinds:
                # print(varBinds)
                value = varBind[1]
                
                # adicionar mais verificações
                if(isinstance(value, Counter32) or isinstance(value, Integer32)):
                    return int(value or "0")
                elif(isinstance(value, OctetString)):
                    return value.asOctets().decode("utf-8")
                
                # if isinstance(value, OctetString):
                #     # Tenta decodificar como texto
                #     try:
                #         decoded = value.asOctets().decode("utf-8")
                #         print(decoded)
                #     except UnicodeDecodeError:
                #         # Se não for texto válido, converte em inteiro
                #         print(int.from_bytes(value.asOctets(), byteorder="big"))
                # else:
                #     # Para INTEGER, COUNTER, GAUGE etc.
                #     print(int(value))
            return value
    except Exception as err:
        # print(f"snmp_get ERROR >>> {err}\n")
        return None
    
    
    