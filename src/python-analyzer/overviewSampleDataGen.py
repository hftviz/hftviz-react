import pandas as pd
import json
import numpy as np


df = pd.read_csv("./constituents-financials_csv.csv", header=0)

o = {}
for i, r in df.iterrows():
    if r["Symbol"] == "Market_SPY":
        pass
    else:


        o[r["Symbol"]] = {
            "2019-01-03":{"priceChange":list(np.around(np.random.normal(0, 0.3, 39),2))},
            "2019-01-04":{"priceChange":list(np.around(np.random.normal(0, 0.3, 39),2))},
            "2019-01-05":{"priceChange":list(np.around(np.random.normal(0, 0.3, 39),2))}
        }



with open("./overviewSampleData.json", "w") as f:
    json.dump(o, f)
