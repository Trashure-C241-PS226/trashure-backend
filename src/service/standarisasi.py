from sklearn.preprocessing import StandardScaler, LabelEncoder
import pandas as pd
import numpy as np
import sys
import json

url = 'https://raw.githubusercontent.com/Trashure-C241-PS226/ML/main/Mobile%20phone%20price.csv'
data  = pd.read_csv(url)

def convert_memory_size(memory):
    if 'GB' in memory:
        return int(memory.replace('GB', ''))
    elif 'MB' in memory:
        return int(memory.replace('MB', ''))
    return int(memory)

label_encoders = {}
categorical_columns = ['Brand']
for column in categorical_columns:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

data['Storage '] = data['Storage '].apply(convert_memory_size)
data['RAM '] = data['RAM '].apply(convert_memory_size)

data.columns = data.columns.str.strip()
data.columns = data.columns.str.replace(' ', '_')

data = data.drop(['Model'], axis=1)

data["Camera_(MP)"] = data["Camera_(MP)"].str.replace("MP","")
data["Camera_(MP)"] = data["Camera_(MP)"].str.replace("D","")

data["Camera_(MP)"] = data["Camera_(MP)"].str.split("+")

listx = []
for i in data.index:
    listx.append(data["Camera_(MP)"][i][0])

data["Camera_(MP)"] = listx
data["Camera_(MP)"] = data["Camera_(MP)"].astype("float64")

data = data[~(data["Screen_Size_(inches)"] == "7.6 (unfolded)")]
data = data[~(data["Screen_Size_(inches)"] == "6.8 + 3.9")]

data['Price_($)'] = data['Price_($)'].str.replace('$','')

data["Screen_Size_(inches)"] = data["Screen_Size_(inches)"].astype("float64")
data['Brand'] = data['Brand'].astype("float64")
data['Storage'] = data['Storage'].astype("float64")
data['RAM'] = data['RAM'].astype("float64")
data['Battery_Capacity_(mAh)'] = data['Battery_Capacity_(mAh)'].astype("float64")
data['Price_($)'] = data['Price_($)'].str.replace(',','')
data['Price_($)'] = data['Price_($)'].astype("float64")

desc = data['Price_($)'].describe()

q1 = desc['25%']
q2 = desc['50%']
q3 = desc['75%']

def categorize_price(price):
    if price < q1:
        return 0
    elif q1 <= price < q2:
        return 1
    elif q2 <= price < q3:
        return 2
    else:
        return 3

data['Category'] = data['Price_($)'].apply(categorize_price)

data = data.drop(['Price_($)'], axis=1)

features = data.drop(columns=['Category'])
target = data['Category']

scaler = StandardScaler()
features = scaler.fit_transform(features)

# Mendapatkan input dari argumen baris perintah
input_data = json.loads(sys.argv[1])

new_data = pd.DataFrame(input_data)

new_data['Storage'] = new_data['Storage'].apply(convert_memory_size)
new_data['RAM'] = new_data['RAM'].apply(convert_memory_size)

new_data_normalized = scaler.transform(new_data)

# Mengubah hasil normalisasi menjadi JSON dan mencetaknya
print(json.dumps(new_data_normalized.tolist()))
