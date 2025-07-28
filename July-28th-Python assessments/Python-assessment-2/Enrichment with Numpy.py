import numpy as np
import pandas as pd
scores=np.random.randint(35,101,size=20)
print(scores)

count_above_75=np.sum(scores>75)


mean_score=scores.mean()
std_dev=scores.std(ddof=0)



print(f"Count >75: {count_above_75}")
print(f"Mean score: {mean_score:.2f}")
print(f"Std deviation: {std_dev:.2f}")

df=pd.DataFrame({
    'studentID':range(1,len(scores)+1),
    'score':scores
})
df.to_csv('scores.csv')
print("scores.csv has been created.")
print(df)
