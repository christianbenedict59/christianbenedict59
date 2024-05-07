#%%
import pandas as pd 
import plotly.express as px 
df = pd.read_csv("https://github.com/byuidatascience/data4names/raw/master/data-raw/names_year/names_year.csv") 

#Elevator Pitch 
#After my analysis, here are the biggest insights that I have gained 
# 1. Prior to the 1950s there was steady increase in birth, however during the mid 1950s births began trending downward
# 2. Historically, the most popular names are John, James, and Robert
# 3. Despite being the most popular names historically, John, James, and Robert has all seen sharp declines recently 
#%%
chart = px.line(df.query("name == 'Robert'"), x="year", y="Total", title="Robert Graph")
chart.show()


#%%
chart_2 = px.line(df.query("name == 'Brittany'"), x="year", y="Total", title="Brittany Graph")
chart_2.show()

#%%
names = ['Robert', 'John', 'Mary', 'Martha']  # Fixed the missing comma
filtered_df = df.query("name in @names and year >= 1930")
chart_3 = px.line(filtered_df, x='year', y='Total', color='name', title='Name Popularity Trends')
chart_3.show()
#%%
chart_4 = px.line(df.query("name == 'John'"), x="year", y="Total", title="John Graph")
chart_4.show()