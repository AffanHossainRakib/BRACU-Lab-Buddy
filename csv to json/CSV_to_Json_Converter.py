import csv
import json

with open('ConnectRoutineView.csv', mode='r', newline='', encoding='utf-8') as csvfile:
    data = list(csv.DictReader(csvfile))

with open('output.json', mode='w', encoding='utf-8') as jsonfile:
    json.dump(data, jsonfile, indent=4)