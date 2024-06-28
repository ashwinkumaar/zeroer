import os
# import shutil
import sys
# import subprocess
import re
import time
from datetime import datetime
import json
import logging



import pika
# import asyncio

# Load the db and rabbitmq connectors
# from extensions import init_mysql, open_rabbitmq_connection


# sys.path.append("../")
# import single_entry_run

from data_loading_helper.data_loader import load_data
from data_loading_helper.feature_extraction import *
from utils import run_zeroer
from blocking_functions import *
from os.path import join
import pandas as pd
import numpy as np
pd.options.mode.chained_assignment = None  # default='warn'
from model import ZeroerModel
import csv

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("dataset",type=str)
parser.add_argument("--run_transitivity",type=bool,default=False,nargs="?",const=True, help="whether to enforce transitivity constraint")
parser.add_argument("--LR_dup_free",type=bool,default=False,nargs="?",const=True, help="are the left table and right table duplicate-free?")
parser.add_argument("--LR_identical",type=bool,default=False,nargs="?",const=True, help="are the left table and right table identical?")

data_path = "datasets"

sys.path.append("../")
from consumer.extensions import init_mysql, open_rabbitmq_connection
import consumer.model as model

# # Load the db modesl
# import models


# Test RabbitMQ Connection
with open_rabbitmq_connection() as channel:
    method_frame, header_frame, body = channel.basic_get(
        queue="analyse-user-queue"
    )

# Test MySQL
with init_mysql() as mysql:
    user = (
        mysql.query(model.User)
        .filter(model.User.user_name == "brunos")
        .first()
    )   
    print(user)


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

def single_entry_run(data_backend):
    # Load model from pickle file and use it to predict on a single entry
    model = ZeroerModel.load_model("saved_models/fodors_zagats_model.pkl")

    # get last row's id from fodors.csv
    fodors_csv = "C:/Users/Xuan Ming/Desktop/repos/hackathons/zeroer/model/datasets/fodors_zagats/fodors.csv"
    ltable_raw_df = pd.read_csv(fodors_csv)
    last_row_id = ltable_raw_df["id"].max()
    if data_backend:
        data_backend.setdefault('id', 8000)
        data_backend.setdefault('name', 'hotel bel-air')
        data_backend.setdefault('addr', '701 stone canyon rd.')
        data_backend.setdefault('city', 'bel air')
        data_backend.setdefault('phone', '310/472-1211')
        data_backend.setdefault('type', 'californian')
        data_backend.setdefault('class', 2)
        data = [data_backend["id"], data_backend["name"], data_backend["addr"], data_backend["city"], data_backend["phone"], data_backend["type"], data_backend["class"]]
    else:    
        data = [last_row_id+1, 'hotel bel-air','701 stone canyon rd.','bel air','310/472-1211','californian',2]
    
    # Enclose all strings in single quotes
    data = [f"'{item}'" if isinstance(item, str) else item for item in data]

    # Append the new entry to the fodors.csv file
    with open(fodors_csv, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(data)
    
    # Load the data and generate features
    ltable_df, rtable_df, duplicates_df, candset_df = load_data("C:/Users/Xuan Ming/Desktop/repos/hackathons/zeroer/model/datasets/fodors_zagats/fodors.csv", 
                                                                "C:/Users/Xuan Ming/Desktop/repos/hackathons/zeroer/model/datasets/fodors_zagats/zagats.csv", "", blocking_functions_mapping["fodors_zagats"], include_self_join=False)
    # If duplicates_df is None, create an empty DataFrame
    if duplicates_df is None:
        duplicates_df = pd.DataFrame(columns=["ltable_id", "rtable_id"])
    
    # Gather features and labels
    candset_features_df = gather_features_and_labels(ltable_df, rtable_df, duplicates_df, candset_df)
    similarity_features_df = gather_similarity_features(candset_features_df)
    
    # Use the predict_PM function on the single test entry
    P_M = model.predict_PM(similarity_features_df)

    pred_df = candset_features_df[["ltable_id","rtable_id"]]
    pred_df['pred'] = P_M
    if data_backend:
        entries_with_newdata = pred_df.loc[pred_df['ltable_id'] == str(data_backend["id"])] 
    else:
        entries_with_newdata = pred_df.loc[pred_df['ltable_id'] == str(last_row_id+1)] 

    entries_with_newdata = entries_with_newdata.loc[entries_with_newdata['pred'] == 1]
    
    mapped_id = entries_with_newdata["rtable_id"].values.astype(int) 
    return mapped_id 
    
  
def run_model(data):
    return single_entry_run(data)
    # return ['13', '23', '10']


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
                    print(data)

                    # user_id = data["user_id"]
                    
                    # user = (
                    #     mysql.query(model.User)
                    #     .filter(model.User.user_name == "brunos")
                    #     .first()
                    # )   
                    # print(user)

                    # user = (
                    #     mysql.query(model.User)
                    #     .filter(model.User.id == user_id)
                    #     .first()
                    # )   
                    # print(user)
                    ###### Run model ###########


                    relationships = run_model(data)
                    ###########################
                    print("relationship",relationships)
                    # relationship_str = json.dumps(relationships, default=int)
                    relationship_str = ", ".join(str(x) for x in relationships)
                    
                    
                    
                    # Get user
                    user = (
                        mysql.query(model.User)
                        .filter(model.User.id == data["id"])
                        .first()
                    )   
                    print(user)
                    
                    # Update status
                    user.process_status = "processed"
                    
                    
                    new_relationship = model.Group(id=user.id, user_relationship=relationship_str)
                    print(relationship_str)
                    
                    mysql.add(new_relationship)
                    mysql.commit()
                    
                    print("here")
                    
                    
                    # mysql.commit()
                    # Add reslationship
                    # for next_id in relationships:
                    #     new_relationship = model.Group(user_id=user.id, user_relationship=)
                    #     mysql.add(new_relationship)
                    #     mysql.commit()
                        
                    
                    
                    

                    # user.process_status = "completed"

                    # Save it in database
                    # mysql.commit()
                    # mysql.commit()

            
                print("Done",  data, relationship_str)
                
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
