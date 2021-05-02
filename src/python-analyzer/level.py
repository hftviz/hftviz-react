import json
import math
import numpy as  np 



# open files
with open('./bid.json') as f:
    bid_data = json.load(f)
with open('./ask.json') as f:
    ask_data = json.load(f)
with open('./cancel.json') as f:
    cancel_data = json.load(f)
with open('./volume.json') as f:
    volume_data = json.load(f)


# time line:
timeline = range(34200000000, 57600000001)

def find_nearest(array, value):
    array = np.asarray(array)
    idx = (np.abs(array - value)).argmin()
    return (array[idx], idx)

def chunk(timeline, data, parts, type):
    binSize = math.floor(len(timeline) / parts)
    # results
    output = {}

    for company in data:
        for date in data[company]:

            # local data
            local_data = data[company][date]
            result = {"value":[], "time":[], "messageNum":[]}

            for i in range(0, len(timeline)-binSize, binSize):
                closest_start, closest_start_index = find_nearest(local_data["ms"], timeline[i])
                closest_end, closest_end_index = find_nearest(local_data["ms"], timeline[i+binSize-1])

                # find chunks
                valueChunk = local_data["value"][closest_start_index:closest_end_index+1]
                timeChunk = local_data["time"][closest_start_index][:-3]
                messageNumChunk = len(valueChunk)

                # create results
                if type == "volume":
                    result["value"].append(sum(valueChunk))
                else:
                    result["value"].append(sum(valueChunk)/len(valueChunk))
                
                result["time"].append(timeChunk)
                result["messageNum"].append(messageNumChunk)
            
            output.update({company: {date: result}})
    
    return output





with open("./ask-level3.json", "w") as f:
    out = chunk(timeline, ask_data, 10000, "ask")
    json.dump(out, f)

with open("./bid-level3.json", "w") as f:
    out = chunk(timeline, bid_data, 10000, "bid")
    json.dump(out, f)

with open("./cancel-level3.json", "w") as f:
    out = chunk(timeline, cancel_data, 10000, "cancel")
    json.dump(out, f)

with open("./volume-level3.json", "w") as f:
    out = chunk(timeline, volume_data, 10000, "volume")
    json.dump(out, f)       