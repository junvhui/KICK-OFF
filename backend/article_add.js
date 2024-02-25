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
      title: '알폰소 데이비스, 레알 마드리드 간다 "이적료 최소 580억에 합의"',
      content: 'https://v.daum.net/v/20240225182106255',
      url: 'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202402/25/spotvnews/20240225182108798dscr.jpg',
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
