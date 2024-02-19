import requests
import json
from pymongo import MongoClient
from flask import Flask, render_template, jsonify
from flask_cors import CORS

import certifi

ca = certifi.where()

app = Flask(__name__)
CORS(app)

# 해외축구 순위 API
uri = 'https://api.football-data.org/v4/persons/97'
headers = { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' }

response = requests.get(uri, headers=headers)

print(response.json())