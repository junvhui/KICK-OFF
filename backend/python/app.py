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


# # 새로운 문서 추가
# new_document = {
#     "title": "[오피셜] ‘유럽 재진출’ 백승호, 버밍엄 시티 입단…잉글랜드에서 새로운 도전 나선다",
#     "content": "https://www.goal.com/kr/%EB%89%B4%EC%8A%A4/%E1%84%8B%E1%85%A9%E1%84%91%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AF--%E1%84%8B%E1%85%B2%E1%84%85%E1%85%A5%E1%86%B8-%E1%84%8C%E1%85%A2%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%AE%E1%86%AF-%E1%84%87%E1%85%A2%E1%86%A8%E1%84%89%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A9-%E1%84%87%E1%85%A5%E1%84%86%E1%85%B5%E1%86%BC%E1%84%8B%E1%85%A5%E1%86%B7-%E1%84%89%E1%85%B5%E1%84%90%E1%85%B5-%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%83%E1%85%A1%E1%86%AB--%E1%84%8B%E1%85%B5%E1%86%BC%E1%84%80%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%89%E1%85%A2%E1%84%85%E1%85%A9%E1%84%8B%E1%85%AE%E1%86%AB-%E1%84%83%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB-%E1%84%82%E1%85%A1%E1%84%89%E1%85%A5%E1%86%AB%E1%84%83%E1%85%A1/blt3fae9638950c910b",
#     "url": "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf2e11ea8d3717dbd/65b81a119a3a8c040a48ed1f/g78422.jpg?auto=webp&format=pjpg&width=2048&quality=60",
# }

# # collection에 문서 추가
# insert_result = collection.insert_one(new_document)

# # 삽입된 문서의 ObjectId 확인
# print("Inserted document ID:", insert_result.inserted_id)




# 이적정보 가져오기
@app.route('/article', methods=['GET'])
def get_article():
    article = list(db.article.find({}))
    
    # _id만 변환하고 나머지는 그대로 유지
    for t in article:
        t['_id'] = str(t['_id'])
        t['url'] = str(t['url'])

        print("Fetched users:", article)

    return jsonify({'result': 'success', 'article': article})


# 해외축구 순위 가져오기
@app.route('/rank', methods=['GET'])
def get_rank():
    rank = list(db.rank.find({}))
    
    # _id만 변환하고 나머지는 그대로 유지
    for t in rank:
        t['_id'] = str(t['_id'])
        t['rank'] = [t['rank']]  

        print("Fetched users:", rank)

    return jsonify({'result': 'success', 'rank': rank})

# 선수 이적정보 가져오기
@app.route('/transfer', methods=['GET'])
def get_transfer():
    transfer = list(db.transfer.find({}))
    
    # _id만 변환하고 나머지는 그대로 유지
    for t in transfer:
        t['_id'] = str(t['_id'])
        t['name'] = str(t['name'])
        t['playerImg'] = str(t['playerImg'])
        t['pre'] = str(t['pre'])
        t['preImg'] = str(t['preImg'])
        t['current'] = str(t['current'])
        t['currentImg'] = str(t['currentImg'])
        t['league'] = str(t['league'])
        

        print("Fetched users:", transfer)

    return jsonify({'result': 'success', 'transfer': transfer})

if __name__ == '__main__':
    app.run(debug=True)

