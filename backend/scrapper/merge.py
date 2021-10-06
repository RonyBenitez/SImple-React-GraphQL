import pandas as pd
maindf=pd.read_csv("./movies.txt",sep="|",header=None)
postersdf=pd.read_csv("./posters.csv",header=None)
urlsdf=pd.read_csv("./urls.csv",header=None)
cols=maindf.columns
cols=[cols[i] for i in [0,1,2,4]]
maindf=maindf[cols]

colsmain=maindf.columns
colsposter=postersdf.columns
print(colsposter,colsmain)
merged=maindf.merge(right=postersdf,left_on=0,right_on=0)
merged=merged.merge(right=urlsdf,left_on=0,right_on=0)
merged.columns=['Id','Title','Date','Url','Poster','Title2']
merged.T.to_json("./final.json")

