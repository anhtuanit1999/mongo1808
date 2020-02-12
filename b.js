const { MongoClient } = require('mongodb');
//****************************
const express = require('express');
const app = express();
const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
//***************************


const url = 'mongodb://127.0.0.1:27017';

const dbName = 'shop';

MongoClient.connect(url, (err, client) => {
    if(err) return console.log(err);
    const db = client.db(dbName);

    findDocument(db, (docs) => {
        console.log(docs);
        client.close();
    });
});

const findDocument = (db, cb) => {
    const collection = db.collection('words');

    collection.find({}).toArray((err, docs) => {
        if(err) return console.log(err);
        console.log('Find some records');
        cb(docs);
    });
};

