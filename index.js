const { MongoClient } = require('mongodb');
let wordsCollection;

//****************************
const express = require('express');
const app = express();
const PORT = 3000;

// let result = [
//     { en: "good bye", vn: "tam biet" },
//     { en: "mouse", vn: "chuot" },
//     { en: "laptop", vn: "may tinh" }
// ];


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    findDocument(wordsCollection, (docs) => {
        res.render('home', { arrWords: docs });
    });
});
//***************************

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'shop';

MongoClient.connect(url, (err, client) => {
    if(err) return console.log(err);
    const db = wordsCollection = client.db(dbName);    

    app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
    // findDocument(db, (docs) => {
    //     arrWords  = docs;
    //     client.close();
    // });
});

const findDocument = (db, cb) => {
    const collection = db.collection('words');

    collection.find({}).toArray((err, docs) => {
        if(err) return console.log(err);
        console.log('Find some records');
        cb(docs);
    });
};

