
from flask import Flask, Response, request, jsonify
import json

app = Flask(__name__)


@app.route('/savelist', methods = ["POST"]) 
def savelist():
    list_ = request.json
    listfile = open("list.txt", "w")
    listfile.write(json.dumps(list_))
    res = Response('')
    return res

@app.route('/getlist')
def restorelist():
    listfile = open("list.txt", "r")
    list_ = listfile.read()
    res = Response(json.dumps(list_))
    res.headers = {'Content-Type':'application/json'}
    return res

app.run(debug=True, port=5001)