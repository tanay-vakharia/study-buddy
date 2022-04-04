import requests
from threading import Timer

url = "http://127.0.0.1:5000/focus"

global focus
focus = True

def post():
    requests.post(url, json={"focus": focus})
    Timer(5, post).start()

post()

while True:
    focus = not focus