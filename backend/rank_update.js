const axios = require('axios');
const { MongoClient } = require('mongodb');

const uris = [
  [
    'PL',
    'https://api.football-data.org/v4/competitions/PL/standings',
    { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' },
  ],
  [
    'BL1',
    'https://api.football-data.org/v4/competitions/BL1/standings',
    { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' },
  ],
  [
    'SA',
    'https://api.football-data.org/v4/competitions/SA/standings',
    { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' },
  ],
  [
    'PD',
    'https://api.football-data.org/v4/competitions/PD/standings',
    { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' },
  ],
  [
    'FL1',
    'https://api.football-data.org/v4/competitions/FL1/standings',
    { 'X-Auth-Token': '88b4ce4e5a30430c8f0ffa6fb8aae569' },
  ],
];

// MongoDB에 연결
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

async function updateMongoDB() {
  try {
    const db = client.db('kickoff');
    const collection = db.collection('rank');

    for (const [league, uri, headers] of uris) {
      const response = await axios.get(uri, { headers });
      const standingsData = response.data.standings || [];

      for (const stand of standingsData) {
        await collection.updateMany({ league }, { $set: { rank: stand.table || [] } });
      }

      // 업데이트된 문서 확인
      const updatedDocuments = await collection.find({ league }).toArray();
      updatedDocuments.forEach((doc) => {
        console.log(`Updated document for ${league}:`, doc);
      });
    }
  } catch (error) {
    console.error('Error updating MongoDB:', error);
  }
}

async function run() {
  await connectToMongoDB();
  await updateMongoDB();
  await client.close();
}

run(); // 서버 실행 코드 제거
