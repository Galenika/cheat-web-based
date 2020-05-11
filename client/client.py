import requests
import time
data = {
    "uid": 1
}

latest_data = None;

def sendRequest():
    request = requests.get("http://localhost:3002/getFeatures", data=data)
    latest_data = request.json()
    print("response: " + str(latest_data))
    

while True: 
    sendRequest()
    time.sleep(5)