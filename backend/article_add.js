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
      title: '‘주급이라도 아끼자’ 맨유, 앙토니 마샬 1년 연장 옵션 행사 안 한다',
      content: 'https://www.stnsports.co.kr/news/articleView.html?idxno=210532',
      url: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt75efef14859572cf/65a952bcda2a53040a5cf06a/Martial_Man_United.jpg?auto=webp&format=pjpg&width=2048&quality=60',
      team: '맨유',
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
