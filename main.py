import json
from collections import defaultdict

with open ('CSE_Lab_Schedule.json', mode='r', encoding='utf-8') as cse_lab:
    cse_lab_schedule = json.load(cse_lab)
    
    unique_lab = set()
    lab_info = defaultdict(set)

    for single_lab_info in cse_lab_schedule:
        unique_lab.add(single_lab_info['Lab Room'])
        
        key = single_lab_info["Lab Day"] + "-" + single_lab_info["Lab Time (3hr)"]
        lab_info[key].add(single_lab_info['Lab Room'])

    day = ["SAT", "SUN", "MON", "TUE", "WED", "THU"]
    time = ["8:00 AM", "11:00 AM", "2:00 PM", "3:30 PM"]

    print(20*"=")

    print(f"Select Week Day: ")
    for index, value in enumerate(day):
        print(f"{index}: {value}")

    print(20*"=")

    d = int(input())

    print(20*"=")

    print(f"Select Time: ")
    for index, value in enumerate(time):
        print(f"{index}: {value}")

    print(20*"=")
    
    t = int(input())
    
    print(20*"=")
    
    day_time = day[d] + "-" + time[t]
    
    for lab in unique_lab:
        if lab not in lab_info[day_time]:
            print(lab)
    
    print(20*"=")