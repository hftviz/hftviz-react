from os import name
import pandas as pd


names = pd.read_csv("constituents-financials_csv.csv", header=0)

for index, row in names.iterrows():

    pass