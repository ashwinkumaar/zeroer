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

def single_entry_run(data_backend=""):
    # Load model from pickle file and use it to predict on a single entry
    model = ZeroerModel.load_model("saved_models/fodors_zagats_model.pkl")

    # get last row's id from fodors.csv
    fodors_csv = "datasets/fodors_zagats/fodors.csv"
    ltable_raw_df = pd.read_csv(fodors_csv)
    last_row_id = ltable_raw_df["id"].max()
    
    if data_backend:
            data = [last_row_id+1, data_backend.name, data_backend.addr, data_backend.city, data_backend.phone, data_backend.type, data_backend.class_]
    else:    
        data = [last_row_id+1, 'hotel bel-air','701 stone canyon rd.','bel air','310/472-1211','californian',2]
    
    # Enclose all strings in single quotes
    data = [f"'{item}'" if isinstance(item, str) else item for item in data]

    # Append the new entry to the fodors.csv file
    with open(fodors_csv, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(data)
    
    # Load the data and generate features
    ltable_df, rtable_df, duplicates_df, candset_df = load_data("datasets/fodors_zagats/fodors.csv", "datasets/fodors_zagats/zagats.csv", "", blocking_functions_mapping["fodors_zagats"], include_self_join=False)
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
    entries_with_newdata = pred_df.loc[pred_df['ltable_id'] == str(last_row_id+1)] 
    entries_with_newdata = entries_with_newdata.loc[entries_with_newdata['pred'] == 1]
    
    mapped_id = entries_with_newdata["rtable_id"].values.astype(int) 
    return mapped_id 
    
    

if __name__ == '__main__':
    single_entry_run()