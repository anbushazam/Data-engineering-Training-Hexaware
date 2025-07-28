import pandas as pd
df=pd.read_csv('orders.csv')

df['CustomerName']=df['CustomerName'].fillna("Unknown")
df['Quantity']=df['Quantity'].fillna(0)
df['Price']=df['Price'].fillna(0)

df['TotalAmount']=df['Quantity']*df['Price']
print(df)
df.to_csv('orders_cleaned.csv')