import pandas as pd
import json


df = pd.read_csv("./constituents-financials_csv.csv", header=0)

o = []
for i, r in df.iterrows():
    if r["Symbol"] == "Market_SPY":
        pass
    else:

        l = {}

        l["Name"] = r["Name"]
        l["Symbol"] = r["Symbol"]
        l["Sector"] = r["Sector"]
        l["MarketCap"] = r["Market Cap"]
        l["Volume"] = r["Market Cap"]/r["Price"]

        o.append(l)



with open("./stockNames.json", "w") as f:
    json.dump(o, f)
