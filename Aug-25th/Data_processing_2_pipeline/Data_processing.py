import pandas as pd
from azure.storage.blob import BlobServiceClient
import os

# 1. Environment variables for Blob Storage
account_name   = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
account_key    = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
container_name = os.getenv("AZURE_CONTAINER_NAME")


df=pd.read_csv('Data\Raw_sales_data2.csv')
df=df.drop_duplicates(subset=['order_id'])
df['region']=df['region'].fillna("Unknown")
df['revenue']=df['revenue'].fillna(0)
df["profit_margin"]=(df['revenue']-df['cost'])/df['revenue'].replace(0,pd.NA)
df["profit_margin"] = df["profit_margin"].fillna(0)
def segment(x):
    if x >100000:
        return "platinum"
    elif x>50000:
        return "Gold"
    else:
        return "standard"
df["Categorized_segments"]=df['revenue'].apply(segment)
print(df)
df.to_csv('Data\processed_sales_data.csv',header=True,index=False)
blob_url = f"https://{account_name}.blob.core.windows.net"
client   = BlobServiceClient(account_url=blob_url, credential=account_key)
container = client.get_container_client(container_name)
raw_out="Data\Raw_sales_data2.csv"
proc_out="Data\processed_sales_data.csv"
for path in (raw_out, proc_out):
    blob_name = os.path.basename(path)
    with open(path, "rb") as data:
        container.upload_blob(name=blob_name, data=data, overwrite=True)
        print(f"Uploaded {blob_name} to container {container_name}")
