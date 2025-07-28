

import pandas as pd
import numpy as np
df=pd.read_csv('students_cleaned.csv')
conditions = [
    df['Score'] >= 85,
    (df['Score'] < 85) & (df['Score'] >= 60)
]
choices = ["Distinction", "Passed"]
df['Status']=np.select(conditions,choices,default="Failed")

df['Tax_ID']="Tax-"+df['ID'].astype(str)
print(df)

