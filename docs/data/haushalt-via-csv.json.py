from joblib import Memory
import pandas as pd
from zenrows import ZenRowsClient
from dotenv import load_dotenv
import os
from io import StringIO
load_dotenv()

memory = Memory('cache', verbose=0)
client = ZenRowsClient(apikey=os.getenv("ZENROWS_API_KEY"))
get = memory.cache(client.get)
csv = get("https://www.bundeshaushalt.de/static/daten/2024/soll/HH_2024.csv").text
csv = csv.replace("\n", ";\n", 1)
df = pd.read_csv(StringIO(csv), sep=";")
print(df.head())