import pandas as pd
import numpy as np
df=pd.read_csv("Data\\raw_data_piplines.csv")

df['Date']=pd.to_datetime(df['Date'],infer_datetime_format=True,errors='coerce')
df.replace(' ', np.nan, inplace=True)

df=df.dropna()
df.columns= (col.lower() for col in df.columns)
df.to_csv("Data/cleaned_sales_Data.csv",index=False,header=True)