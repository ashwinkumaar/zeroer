
# PostgreSQL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import pika

import os
from contextlib import contextmanager

# postgres_path = "postgresql://user:password@localhost:5455/zeroer"
# mysql_path = "mysql://zeroer:secret@localhost:3306"
mysql_path = "mysql+pymysql://zeroer:secret@localhost:3306/zeroer"

# Initialise PostgreSQL Connection
engine = create_engine(
    # postgres_path
    mysql_path
)
# engine.execute("USE zeroer")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# def init_postgres():
#     postgres = SessionLocal()
#     try:
#         return postgres
#     finally:
#         postgres.close()

def init_mysql():
    mysql = SessionLocal()
    try:
        return mysql
    finally:
        mysql.close()



# RabitMQ
rabbitmq_url = 'amqp://user:password@localhost'

port = 	5672
vhost = '/%2F'

rabbitmq_url_param = pika.URLParameters(f"{rabbitmq_url}:{port}{vhost}")
# rabbitmq_client = pika.BlockingConnection(
#         url_param
#         )


@contextmanager
def open_rabbitmq_connection():
    rabbitmq_client = pika.BlockingConnection(
        rabbitmq_url_param
        )
    channel = rabbitmq_client.channel()
    print(f"Successfully connected to RabbitMQ", flush=True)
    try:
        yield channel
    except:
        print(f"[ERROR] Failed to connect to RabbitMQ", flush=True)
    finally:
        channel.close()
        print("Closed RabbitMQ", flush=True)


def sql_to_dict(model_instance, query_instance=None):
    if hasattr(model_instance, '__table__'):
        return {c.name: str(getattr(model_instance, c.name)) for c in model_instance.__table__.columns}
    else:
        cols = query_instance.column_descriptions
        return { cols[i]['name'] : model_instance[i]  for i in range(len(cols)) }

def sql_from_dict(dict, model_instance):
    for c in model_instance.__table__.columns:
        setattr(model_instance, c.name, dict[c.name])
    
