from flask import Flask, Response, request, jsonify
import random, json

app = Flask(__name__)

app.run(debug=True,port=5001)