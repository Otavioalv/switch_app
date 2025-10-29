import asyncio
from pysnmp.hlapi.v1arch.asyncio import *


# next
async def run():
    errorIndication, errorStatus, errorIndex, varBinds = await next_cmd(
        SnmpDispatcher(),
        CommunityData('1np@net_ro'),
        await UdpTransportTarget.create(('172.21.0.19', 161)),
        ObjectType(ObjectIdentity('1.3.6.1.2.1.2.2.1.7'))
    )
    print(errorIndication, errorStatus, errorIndex, varBinds)

# asyncio.run(run())

# possivel solução
async def smnp_next():
    iterator = await next_cmd(
        SnmpDispatcher(),
        CommunityData('1np@net_ro'),
        await UdpTransportTarget.create(('172.21.0.19', 161)),
        ObjectType(ObjectIdentity('1.3.6.1.2.1.2.2.1.7'))
    )
    
    errorIndication, errorStatus, errorIndex, varBinds = iterator
    
    print(varBinds)
    


# get
async def snmp_get():
    errorIndication, errorStatus, errorIndex, varBinds = await get_cmd(
        SnmpDispatcher(),
        CommunityData('1np@net_ro'),
        await UdpTransportTarget.create(('172.21.0.19', 161)),
        ObjectType(ObjectIdentity('1.3.6.1.2.1.2.1.0'))
    )
    print(errorIndication, errorStatus, errorIndex, varBinds)
    print(varBinds[0])

asyncio.run(snmp_get())


async def smnp_bulk():
    results = []
    start = 0
    end = 55
    
    errorIndication, errorStatus, errorIndex, varBinds = await bulk_cmd(
        SnmpDispatcher(),
        CommunityData('1np@net_ro'),
        await UdpTransportTarget.create(('172.21.0.19', 161)),
        start, end,
        ObjectType(ObjectIdentity('1.3.6.1.2.1.2.2.1.7'))
    )
    
    
    
    for oid, value in varBinds:
        print(f"{oid} = {value}")
        results.append((str(oid), str(value)))
    
    print(results)
