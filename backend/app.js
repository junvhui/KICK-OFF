const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://sparta:jungle@cluster0.is3qxss.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db, articleCollection, rankCollection, transferCollection;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db('kickoff');
    articleCollection = db.collection('article');
    rankCollection = db.collection('rank');
    transferCollection = db.collection('transfer');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

app.get('/article', async (req, res) => {
  const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
  const PAGE_SIZE = 3;
  try {
    const articles = await articleCollection
      .find({})
      .sort({ _id: -1 }) // _id를 기준으로 역순으로 정렬
      .skip((pageNumber - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray();

    res.json({ result: 'success', article: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ result: 'error', message: 'Internal server error' });
  }
});

app.get('/rank', async (req, res) => {
  try {
    const ranks = await rankCollection.find({}).toArray();
    res.json({ result: 'success', rank: ranks });
  } catch (error) {
    console.error('Error fetching ranks:', error);
    res.status(500).json({ result: 'error', message: 'Internal server error' });
  }
});

app.get('/transfer', async (req, res) => {
  try {
    const transfers = await transferCollection.find({}).toArray();
    res.json({ result: 'success', transfer: transfers });
  } catch (error) {
    console.error('Error fetching transfers:', error);
    res.status(500).json({ result: 'error', message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
