from pymongo import MongoClient
from flask import Flask, render_template, jsonify
from flask_cors import CORS

import certifi

ca = certifi.where()

app = Flask(__name__)
CORS(app)


client = MongoClient('mongodb+srv://sparta:jungle@cluster0.is3qxss.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.kickoff 
collection = db.article


# 새로운 문서 추가
new_document = {
    "title": "파리 생제르맹 관심 진지하다…떠날 가능성 보이면 영입 시도",
    "content": "https://www.goal.com/kr/%EB%89%B4%EC%8A%A4/%E1%84%91%E1%85%A1%E1%84%85%E1%85%B5-%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%85%E1%85%B3%E1%84%86%E1%85%A2%E1%86%BC-%E1%84%80%E1%85%AA%E1%86%AB%E1%84%89%E1%85%B5%E1%86%B7-%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%B5%E1%84%92%E1%85%A1%E1%84%83%E1%85%A1--%E1%84%84%E1%85%A5%E1%84%82%E1%85%A1%E1%86%AF-%E1%84%80%E1%85%A1%E1%84%82%E1%85%B3%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC-%E1%84%87%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%86%E1%85%A7%E1%86%AB-%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%B8-%E1%84%89%E1%85%B5%E1%84%83%E1%85%A9/blt54ef82cbcd16a48f",
    "url": "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt6f9e103d001975b2/65d1abae987fe9040a33db96/rashford.jpg?auto=webp&format=pjpg&width=2048&quality=60",
    "team" : "파리 생제르망"
}

# collection에 문서 추가
insert_result = collection.insert_one(new_document)

# 삽입된 문서의 ObjectId 확인
print("Inserted document ID:", insert_result.inserted_id)


