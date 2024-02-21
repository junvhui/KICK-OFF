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
      title: '"음바페, 레알 마드리드와 합의" BBC까지 등장...음바페 이적 사가 사실상 종료',
      content: 'https://v.daum.net/v/20240221065309589',
      url: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltd69772deadeaf1b3/65c26378d732eb040adaa9e0/Mbappe_Real_Madrid.jpg?auto=webp&format=pjpg&width=2048&quality=60',
      team: '레알 마드리드',
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
