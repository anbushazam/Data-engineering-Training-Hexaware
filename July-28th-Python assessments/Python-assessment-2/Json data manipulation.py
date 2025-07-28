import json
with open('inventory.json','r')as f:
    data=json.load(f)
for i in data:
    if i['stock']>0:
        i['status']="In Stock"
    else:
        i['status'] = "Out of Stock"

for dat in data:
    print(dat)

with open('Inventory_updated.json','w')as ff:
    json.dump(data,ff)