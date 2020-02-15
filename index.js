//cài body-parser để lấy dữ liệu yarn add body-parser or npm i body-parser
const { MongoClient, ObjectID } = require('mongodb');
let wordsCollection;

//****************************
const express = require('express');
const app = express();
const parser = require('body-parser').urlencoded({ extended: false });
const PORT = 3000;

// let result = [
//     { en: "good bye", vn: "tam biet" },
//     { en: "mouse", vn: "chuot" },
//     { en: "laptop", vn: "may tinh" }
// ];

let strAddDB;
let objectDelete;
let objectFind;


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    objectFind = {};
    findDocument(wordsCollection, (docs) => {
        res.render('home', { arrWords: docs });
    });
});

app.get('/remove/:id', (req, res) => {
    objectDelete = { _id: ObjectID(req.params.id) };
    removeDocument(wordsCollection, (docs) =>{
        res.redirect('back');
    });
    // res.send(`${objectDelete}`);
    // console.log(objectDelete);
});

app.get('/edit/:id', (req, res) => {
    objectFind = { _id: ObjectID(req.params.id) };
    findDocument(wordsCollection, (docs) => {
        res.render('edit', { result: docs[0] });
        // res.send(docs);
    });
});

app.post('/add', parser, (req, res) => {
    const { en, vn } = req.body;
    strAddDB = { en, vn };
    insertDocument(wordsCollection, (result) => {
        return res.redirect('back');
    });
});
//***************************

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'shop';

MongoClient.connect(url, (err, client) => {
    if(err) return console.log(err);
    const db = wordsCollection = client.db(dbName);    

    app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
    // objectFind = {};
    // insertDocument(db, (res) => {
    //     findDocument(db, (docs) => {
    //         arrWords  = docs;
    //         client.close();
    //     });
    // });
});

const findDocument = (db, cb) => {
    const collection = db.collection('words');

    collection.find(objectFind).toArray((err, docs) => {
        if(err) return console.log(err);
        console.log('Find some records');
        cb(docs);
    });
};

const insertDocument = (db, cb) => {
    //get the document collection
    const collection = db.collection('words');
    let arrlen; // Tim do dai cua chuoi vua them vao db
    //insert some document
    collection.insertMany(arrlen = [
        strAddDB
    ], (err, result) => {
        if(err) return console.log(err);
        console.log(`Inserted ${arrlen.length} documents into the collection`);
        cb(result);
    });
};

const removeDocument = (db, cb) => {
    const collection = db.collection('words');

    collection.deleteOne(objectDelete, (err, result) => {
        if(err) return console.log(err);
        console.log('Deleted 1 documents into the collection');
        cb(result);
    });
};

