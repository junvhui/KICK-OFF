from pymongo import MongoClient
from flask import Flask, render_template, jsonify
from flask_cors import CORS

import certifi

ca = certifi.where()

app = Flask(__name__)
CORS(app)


client = MongoClient('mongodb+srv://sparta:jungle@cluster0.is3qxss.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.kickoff 
collection = db.transfer


# 새로운 문서 추가
new_document = {
    "name": "정승원",
    "playerImg": "https://i.namu.wiki/i/MQffTAFYdsZNvVdkSryPemov0dqvH_W3repmFEbFA2V15voVD6r9uZqBBAaBRqGY7zTI05En4erkz_5lTPPEQ7jfBmWJIH8vEHBDtnz7C94P_XWlYI03La3lX1ycRpD1qd2yLhhCpEZg5_7Wq2_xGA.webp",
    "pre": "수원 삼성",
    "preImg": "https://i.namu.wiki/i/FkMOZFT6CVO0LsPiyJT2KskP7bd7ys0TUEIBXcg2rm8P27chDa8LTERZGdcfje8JT9rW2JhKF9hFi3wBNx52oQ.svg",
    "current": "수원 FC",
    "currentImg" : "https://i.namu.wiki/i/RWlWlwrU9Ivc6W19y32em5viX6EEnUCAo6nTCkPPzJbGPB6kRR-BjdNT9Sjjak9why00_0VnVeVgm6bSJCnrPg.svg",
    "league": "korea", # "korea", "overseas"
}

# collection에 문서 추가
insert_result = collection.insert_one(new_document)

# 삽입된 문서의 ObjectId 확인
print("Inserted document ID:", insert_result.inserted_id)


