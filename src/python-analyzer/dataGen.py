import numpy as np 
import pandas as pd 
import json
import datetime
import os

bid_output = {}
ask_output = {}
cancel_output = {}
volume_output = {}


# starting point in iterations
root_addr = "./raw-data"

for directory in os.listdir(root_addr):
    # check the lobster files
    details = directory.split('_')

    if details[0] == "LOBSTER":

        symbol = details[2]
        date_time = details[3]

        # next layer in directory
        next_layer = root_addr + '/' + directory

        # read total.csv        
        df = pd.read_csv(next_layer + '/total.csv', header=0)

        bid_messages = []
        ask_messages = []
        cancel_messages = []
        volume_messages = []

        # ask volume is negative (initiate or cancel)
        # bid volume is positive (initiate or cancel)
        for index, row in df.iterrows():

            time = str(datetime.timedelta(seconds=row['time']))
            millisec = int(1000*row['time'])

            if row['type'] == 1:
                if row['direction'] == 1:
                    bid_messages.append({'price': row['price'] / 10000, 'time':time, 'milliseconds': millisec})
                    volume_messages.append({'volume': 1*row['size'], 'time':time, 'milliseconds': millisec})
                
                if row['direction'] == -1:
                    ask_messages.append({'price': row['price'] / 10000, 'time':time, 'milliseconds': millisec})
                    volume_messages.append({'volume': -1*row['size'] , 'time':time, 'milliseconds': millisec})

            if (row['type'] == 2) or (row['type'] == 3):
                cancel_messages.append({'price': row['price'] / 10000, 'time':time, 'milliseconds': millisec})

                if row['direction'] == 1:
                    volume_messages.append({'volume': 1*row['size'], 'time':time, 'milliseconds': millisec})
                
                if row['direction'] == -1:
                    volume_messages.append({'volume': -1*row['size'], 'time':time, 'milliseconds': millisec})
                
        
        ask_output.update({symbol: {date_time: ask_messages}})
        bid_output.update({symbol: {date_time: bid_messages}})
        cancel_output.update({symbol: {date_time: cancel_messages}})
        volume_output.update({symbol: {date_time: volume_messages}})


with open("./ask.json", "w") as f:
    json.dump(ask_output, f)

with open("./bid.json", "w") as f:
    json.dump(bid_output, f)

with open("./cancel.json", "w") as f:
    json.dump(cancel_output, f)

with open("./volume.json", "w") as f:
    json.dump(volume_output, f)


        



