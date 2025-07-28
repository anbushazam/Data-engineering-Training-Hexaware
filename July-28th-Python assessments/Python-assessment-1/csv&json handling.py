import pandas as pd
df=pd.read_csv('students.csv')


df['Age']=df['Age'].fillna(df['Age'].mean())
df['Score']=df['Score'].fillna(0)
print(df)
df.to_csv('students_cleaned.csv')
df2=pd.read_csv('students_cleaned.csv')
df2.to_json('students.json',index=4)