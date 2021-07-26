from os import name
import pandas as pd
import random
import numpy as np
import json


## time gen
def time_gen():
    h = ["9", "10", "11", "12", "13", "14", "15"]
    m = ["00", "10", "20", "30", "40", "50"]
    s = ["00", "30"]
    ms = ["001", "500"]
    time = []

    for i in h:
        for j in m:
            for k in s:
                for l in ms:
                    time.append(i + ":" + j + ":" + k + "." + l)
    return ["9:30:00.394", "9:33:49.923", "9:37:46.917", "9:41:43.721", "9:45:36.020", "9:49:26.664", "9:53:24.466", "9:57:20.830", "10:01:11.110", "10:05:05.966", "10:08:50.153", "10:13:00.343", "10:16:48.033", "10:20:32.398", "10:24:39.570", "10:28:30.700", "10:32:24.248", "10:36:17.953", "10:40:12.558", "10:44:06.603", "10:48:02.941", "10:51:54.542", "10:55:48.185", "10:59:44.074", "11:03:37.174", "11:07:26.145", "11:11:23.224", "11:15:16.419", "11:19:22.107", "11:23:06.874", "11:26:59.328", "11:30:50.635", "11:34:52.165", "11:38:35.013", "11:42:36.295", "11:46:25.577", "11:50:07.796", "11:54:18.745", "11:58:10.450", "12:02:06.432", "12:05:59.978", "12:09:53.814", "12:13:53.914", "12:17:40.777", "12:21:36.825", "12:25:32.515", "12:29:24.253", "12:33:16.561", "12:37:16.559", "12:41:02.713", "12:44:54.139", "12:49:01.060", "12:52:53.574", "12:56:37.184", "13:00:36.044", "13:04:32.874", "13:08:21.819", "13:12:21.364", "13:16:12.041", "13:20:05.421", "13:23:57.775", "13:27:53.758", "13:31:45.531", "13:35:39.982", "13:39:27.514", "13:43:31.602", "13:47:12.168", "13:51:15.311", "13:55:05.297", "13:59:00.208", "14:03:05.243", "14:06:34.836", "14:10:52.509", "14:14:42.559", "14:18:49.683", "14:22:30.678", "14:26:21.919", "14:30:11.989", "14:34:07.692", "14:37:51.570", "14:42:09.175", "14:45:43.315", "14:49:32.970", "14:53:38.674", "14:57:30.024", "15:01:31.660", "15:05:23.400", "15:09:21.700", "15:13:13.313", "15:17:05.815", "15:20:56.817", "15:24:55.143", "15:28:50.690", "15:32:41.364", "15:36:36.533", "15:40:30.023", "15:44:29.384", "15:48:17.654", "15:52:12.908", "15:56:05.915"]


financials = pd.read_csv("constituents-financials_csv.csv", header=0)
times = time_gen()
ask = {}
bid = {}
cancel = {}
volume = {}
date = "2012-06-21"
min_message_num = 20
max_message_num = 20000
max_vol = 3000000
min_vol = 400


for index, row in financials.iterrows():

    company_name = row["Symbol"]
    base_price = row["Price"]
    mu, sigma = base_price, 1.
    ask_price = list(np.around(np.random.normal(mu, sigma, len(times)),2))
    bid_price = [round(i-random.random(), 2) for i in ask_price]
    cancel_price = [ask_price[i] if i%2 else bid_price[i] for i in range(len(times))]
    message_num = random.sample(range(min_message_num, max_message_num), len(times))
    volume_num = random.sample(range(min_vol, max_vol), len(times))

    ask[company_name] = {date: { "value": ask_price, "time": times, "messageNum": message_num}}
    bid[company_name] = {date: { "value": bid_price, "time": times, "messageNum": message_num}}
    cancel[company_name] = {date: { "value": cancel_price, "time": times, "messageNum": message_num}}
    volume[company_name] = {date: { "value": volume_num, "time": times, "messageNum": message_num}}


with open("./ask_2021_07_25.json", "w") as f:
    json.dump(ask, f)

with open("./bid_2021_07_25.json", "w") as f:
    json.dump(bid, f)

with open("./cancel_2021_07_25.json", "w") as f:
    json.dump(cancel, f)

with open("./volume_2021_07_25.json", "w") as f:
    json.dump(volume, f)

    

    




    