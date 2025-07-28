import json
import pandas as pd

with open('products.json','r') as f:
    data=json.load(f)
for prod in data:
    prod['price']+=prod['price']*(10/100)
    print (prod['price'])

with open('products_updated.json','w')as ff:
    json.dump(data,ff)