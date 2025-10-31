FROM python:3.12-slim

WORKDIR /switch_api

# RUN apt-get update && apt-get upgrade && apt-get install -y curl nano
# RUN apt-get update && \
#     apt-get upgrade -y && \
#     apt-get install -y curl nano

RUN apt-get update && apt-get install -y curl nano

COPY requirements.txt .

# instarlr gunicorn direto no dockerfile
RUN pip install --no-cache-dir -r requirements.txt 

COPY . .

EXPOSE 5000

# CMD ["python", "app.py"]
# CMD para Gunicorn com a configuração ideal:
# -k gevent: Usa workers assíncronos para lidar com I/O sem bloquear.
# -w 3: Inicia 3 workers (ajuste conforme os recursos do servidor).
# --timeout 120: Aumenta a tolerância de tempo de requisição para 2 minutos.
# --log-level Debug: Define o tipo do log para "debug", mais detalhado.
# caracter "-": Direciona para a saida padrao "terminal"
# --access-logfile: Liga o log de acesso e direciona para o "-""
# --error-logfile: Direciona os logs de erro para o "-"
# Funcionando para multiplos usuario 
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000", "-k", "gevent", "-w", "3", "--timeout", "120", "--log-level", "debug", "--access-logfile", "-", "--error-logfile","-"]