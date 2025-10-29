from pysnmp.hlapi.v1arch.asyncio import *
import asyncio

    
async def smnp_get(host, community, oid):
    try:
        
        iterator = await get_cmd(
            SnmpDispatcher(),
            CommunityData(community),
            await UdpTransportTarget.create((host, 161)),
            ObjectType(ObjectIdentity(oid))
        )
        
        errorIndication, errorStatus, errorIndex, varBinds = iterator
        
        
        print(errorIndication, errorStatus, errorIndex, varBinds)
        
        if errorIndication:
            print(f"snmp_get ERROR INDICATOR >>> {errorIndication}\n")
            return None
        elif errorStatus:
            print(f'snmp_get ERROR STATUS >>> {errorStatus.prettyPrint()} at {errorIndex and varBinds[int(errorIndex) - 1][0] or "?"} \n')
            return None
        
        
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
        print(f"snmp_get ERROR >>> {err}\n")
        return None
    
    
# print("VAlor: ", asyncio.run(snmp_get('172.21.0.19', '1np@net_ro', '1.3.6.1.2.1.2.1.0')))
    
async def smnp_bulk(host, community, oid, end, start=0):
    results = []
    
    errorIndication, errorStatus, errorIndex, varBinds = await bulk_cmd(
        SnmpDispatcher(),
        CommunityData(community),
        await UdpTransportTarget.create((host, 161)),
        start, end,
        ObjectType(ObjectIdentity(oid))
    )
    
    
    
    for oid, value in varBinds:
        print(f"{oid} = {value}")
        results.append((str(oid), str(value)))
    
    print(results)
    


# interface_count = asyncio.run(smnp_get('172.27.0.27', '1np@net_ro', '1.3.6.1.2.1.2.1.0'))
# print("Interfaces: ", interface_count)
# print("VAlor: ", asyncio.run(smnp_bulk('172.27.0.27', '1np@net_ro', '1.3.6.1.2.1.2.2.1.7', end=interface_count)))
