import subprocess
from flask import Flask, jsonify, request
from focus import connect_and_use, data

import asyncio 

app = Flask(__name__)

@app.route("/connect_muse", methods=['POST'])
def connect_muse():
    arg = request.args.get("id", default = "", type=str)
    if (arg == ""):
        return jsonify(arg), 400

    subprocess.call("python -u muse-lsl.py --name " + arg, shell=True)
    return jsonify(arg), 200

@app.route("/start_focus")
def start_focus():
    connect_and_use()

@app.route('/get_focus', methods=['GET'])
def get_focus():
    response = jsonify({'state': data["focus"]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
