const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://sparta:jungle@cluster0.is3qxss.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db, collection;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('kickoff');
    collection = db.collection('article');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function insertDocument() {
  try {
    await connectToMongoDB();

    const newDocument = {
      title: '투헬 감독과 ‘신뢰 관계’ 깨졌다…올여름 바이에른 뮌헨 떠날 계획',
      content:
        'https://www.goal.com/kr/%EB%89%B4%EC%8A%A4/%E1%84%90%E1%85%AE%E1%84%92%E1%85%A6%E1%86%AF-%E1%84%80%E1%85%A1%E1%86%B7%E1%84%83%E1%85%A9%E1%86%A8%E1%84%80%E1%85%AA-%E1%84%89%E1%85%B5%E1%86%AB%E1%84%85%E1%85%AC-%E1%84%80%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A8-%E1%84%81%E1%85%A2%E1%84%8C%E1%85%A7%E1%86%BB%E1%84%83%E1%85%A1--%E1%84%8B%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%A7%E1%84%85%E1%85%B3%E1%86%B7-%E1%84%87%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AB-%E1%84%86%E1%85%B1%E1%86%AB%E1%84%92%E1%85%A6%E1%86%AB-%E1%84%84%E1%85%A5%E1%84%82%E1%85%A1%E1%86%AF-%E1%84%80%E1%85%A8%E1%84%92%E1%85%AC%E1%86%A8/blt607e62f48dc29af4',
      url: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltde7bfb50d1f04bbb/659435a40c16ee0407258cdb/GettyImages-1835793206(1).jpg?auto=webp&format=pjpg&width=2048&quality=60',
      team: '바이에른 뮌헨',
    };

    const insertResult = await collection.insertOne(newDocument);
    console.log('Inserted document ID:', insertResult.insertedId);
  } catch (error) {
    console.error('Error inserting document:', error);
  } finally {
    await client.close(); // 작업이 완료되면 MongoDB 클라이언트 연결 종료
  }
}

insertDocument(); // 서버 실행 코드 제거
