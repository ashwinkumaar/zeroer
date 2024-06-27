import os
# import shutil
import sys
# import subprocess
import re
import time
from datetime import datetime
import json
import logging

# import models

import pika
# import asyncio

# Load the db and rabbitmq connectors
# from extensions import init_postgres, open_rabbitmq_connection
from extensions import init_mysql, open_rabbitmq_connection

# # Load the db modesl
# import models


# Test RabbitMQ Connection
with open_rabbitmq_connection() as channel:
    method_frame, header_frame, body = channel.basic_get(
        queue="analyse-user-queue"
    )


formatter = logging.Formatter("%(asctime)s - [%(levelname)s] - %(message)s")
handler = logging.FileHandler(filename="logs/user-analyser.log", mode="w")
handler.setFormatter(formatter)
logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(handler)


# def min_max_normaliser(value, x_max, x_min):
#     return (value - x_min) / (x_max - x_min)

# def normalise(interp):
#     # find min and max values
#     max_x = max(interp.values())
#     min_x = min(interp.values())
    
#     # normalize each value in the dict
#     for k, v in interp.items():
#         interp[k] = min_max_normaliser(v, max_x, min_x)
#     return interp

# def normalise_batch(interps):
#     for idx in range(len(interps)):
#         interps[idx] = normalise(interps[idx])
#     return interps

def run_model(data):

    return ['13', '23', '10']


def main():
    method_frame = None
    header_frame = None
    body = None
    while True:
        with open_rabbitmq_connection() as channel:
            method_frame, header_frame, body = channel.basic_get(
                queue="analyse-user-queue"
            )

            

            if method_frame != None and method_frame.NAME == "Basic.GetOk":
                print(method_frame)
                
                # Acknowledge the job first
                channel.basic_ack(delivery_tag=method_frame.delivery_tag)
        
        if method_frame != None and method_frame.NAME == "Basic.GetOk":
            try:
                with init_mysql() as mysql:
                    data = json.loads(body)

                    user_id = data["user_id"]

                    # user = (
                    #     postgres.query(models.Users)
                    #     .filter(models.Users.video_id == user_id)
                    #     .first()
                    # )   

                    ###### Run model ###########


                    relationships = run_model(data)
                    ###########################

                    relationship_str = json.dumps(relationships, default=int)


                    # user.process_status = "completed"

                    # Save it in database
                    # postgres.commit()
                    # mysql.commit()
                    
            
                print("Done", user_id, data, relationship_str)
                
                # Reset
                method_frame = None
                header_frame = None
                body = None

            except Exception as err:
                # print("[ERROR] Failed to process message")
                # print(body)
                # print(err)
                logger.error(f"Failed to process message: {body}")
                logger.exception(err)

                with open_rabbitmq_connection() as channel:
                    # Requeue the job
                    channel.basic_publish(exchange="amq.direct", routing_key="analyse-video-queue",
                        body = body
                    )

        else:
            logger.info("No message")
        time.sleep(1)


if __name__ == "__main__":
    main()
    # asyncio.run(main())
