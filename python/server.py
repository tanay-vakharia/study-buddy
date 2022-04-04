from flask import Flask, jsonify, request, session

app = Flask(__name__)

app.secret_key = 'dljsaklqk24e21cjn!Ew@@dsa5'

data = { "focus": True }

@app.route("/index")
def index():
    data["focus"] = True

@app.route('/focus', methods=['GET', 'POST'])
def focus_state():
    if request.method == 'POST':
        focus = request.get_json().get("focus")
        print(focus)
        data["focus"] = focus
        return jsonify(data), 200
    else:
        response = jsonify({'state': data["focus"]})
        print(data["focus"])
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
