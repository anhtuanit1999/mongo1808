//const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');
//const assert = require('assert');
//Connection URL
const url = 'mongodb://127.0.0.1:27017/';

//Database Name
const dbName = 'shop';

MongoClient.connect(url, (err, client) => {
    //assert.equal(null, err);
    if(err) return console.log(err);
    
    console.log('Connected successfuly to server');

    const db = client.db(dbName);

    findDocument(db, () => {
        client.close();
    });
});

const findDocument = (db, cb) => {
    //get the document collection
    const collection = db.collection('words');
    
    //find some document
    collection.find({}).toArray((err, docs) => {
        //assert(null, err);
        if(err) return console.log(err);

        console.log('Find the folowing records');
        console.log(docs);
        cb(docs);
    });
};

// const insertDocument = (db, cb) => {
//     //get the document collection
//     const collection = db.collection('words');
//     //insert some document
//     collection.insertMany([
//         {a: 1}, {a: 2}, {a: 3}
//     ], (err, result) => {
//         assert.equal(null, err);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         cb(result);
//     });
// };