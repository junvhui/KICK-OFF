import requests
import json
from pymongo import MongoClient
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import certifi

ca = certifi.where()

app = Flask(__name__)
CORS(app)

# API 엔드포인트 및 헤더 설정
uris = [
    ('PL', 'https://api.football-data.org/v4/competitions/PL/standings', { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' }),
    ('BL1', 'https://api.football-data.org/v4/competitions/BL1/standings', { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' }),
    ('SA', 'https://api.football-data.org/v4/competitions/SA/standings', { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' }),
    ('PD', 'https://api.football-data.org/v4/competitions/PD/standings', { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' }),
    ('FL1', 'https://api.football-data.org/v4/competitions/FL1/standings', { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' })
]

# MongoDB에 연결
client = MongoClient('mongodb+srv://sparta:jungle@cluster0.is3qxss.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.kickoff 
collection = db.rank

# 각 리그에 대한 데이터 가져오고 MongoDB에서 업데이트
for league, uri, headers in uris:
    response = requests.get(uri, headers=headers)
    standings_data = response.json().get('standings', [])
    for stand in standings_data:
        collection.update_many({"league": league}, {"$set": {"rank": stand.get('table', [])}})

# 업데이트된 문서 확인
for league, _, _ in uris:
    updated_documents = collection.find({"league": league})
    for doc in updated_documents:
        print("Updated document for", league, ":", doc)
