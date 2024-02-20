const { MongoClient } = require('mongodb');

// MongoDB 연결
const uri = 'mongodb+srv://sparta:jungle@cluster0.is3qxss.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function insertDocument() {
  try {
    await connectToMongoDB();

    const db = client.db('kickoff');
    const collection = db.collection('transfer');

    const newDocument = {
      name: '아라불리',
      playerImg:
        'https://images.chosun.com/resizer/mUVfBRwUKz-_rFXIXnJ-G0xhnHM=/650x341/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/2JCEITVW3H2ODBM5FGRTJT3RC4.png',
      pre: 'FC 네프치 페르가나',
      preImg:
        'https://i.namu.wiki/i/8WMYVxxkA8i1-ImmxFk5iIOddoJCPG2dIqqALMWcTe2LLrYOQtFqC6eLzX4ICjkgbcYQAVwguQJecr1C-LBbxqKebNHZ8lT35qEQGfbje-B728dAbcXcrJpcYoKLmAnbAtI5ZZMzZmSw2HHRSldKtg.webp',
      current: '경남 FC',
      currentImg:
        'https://i.namu.wiki/i/sxTKbrnyFqTuQbuk0RChJF3RTVSJU2oii2T-OFPeSwqF01Yq0_OC1H-oY-gi-83D9tvxYD-GF1kj8v1a0mFrfb_MpvF8tiFnGeryd7DhVWS34CTm48IloEfaYQTQp18jYdWGD-0PFsaJKIrJrSq1_g.svg',
      league: 'korea', // "korea", "overseas"
    };

    const insertResult = await collection.insertOne(newDocument);
    console.log('Inserted document ID:', insertResult.insertedId);
  } catch (error) {
    console.error('Error inserting document:', error);
  } finally {
    await client.close(); // MongoDB 클라이언트 연결 종료
  }
}

insertDocument(); // 서버 실행 코드 제거
