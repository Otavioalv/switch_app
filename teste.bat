@echo off
:loop
    echo Verificando a saude do servico...

    curl -X POST -H "Content-Type: application/json" -H "Time-Zone: America/Manaus" -d "{\"bsteii\": \"123/132/123\",\"haeiii\": \"123/132/123\"}" 192.168.1.107:5000/switch/list-switches
    @REM curl -X GET -H "Content-Type: application/json" -H "Time-Zone: America/Manaus" -d "{\"bsteii\": \"123/132/123\",\"haeiii\": \"123/132/123\"}" 192.168.1.115:5000/test

    echo.
    echo Aguardando 0.5 segundos...

    ping -n 1 -w 500 127.0.0.1 >nul

goto loop