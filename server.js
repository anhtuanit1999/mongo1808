const express = require('express');
const mongoose = require('mongoose');
const Word = require('./Word');
const parser = require('body-parser').urlencoded({ extended: false });
const app = express();
const PORT = 3000;

//**********************************************
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    Word.find()
    .then(result => res.render('home', { arrWords: result }));
});

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    Word.findByIdAndDelete(id)
    .then(() => res.redirect('back'))
    .catch(err => res.send(err.message));
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    // Word.findOne({ _id: id})
    // .then(docs =>  res.render('edit', { result: docs }))
    // .catch(err => res.send(err.message));
    Word.findById(id)
    .then(result =>  res.render('edit', { result }))
    .catch(err => res.send(err.message));
});

app.post('/add', parser, (req, res) => {
    const { en, vn } = req.body;
    // const objectInsert = { en, vn };
    // Word.insertMany(objectInsert)
    // .then(() => res.redirect('back'))
    // .catch(err => res.send(err.message));
    const word  = new Word({ en, vn });
    word.save()
    .then(() => res.redirect('back'))
    .catch(err => res.send(err.message));
});

app.post('/edit/:id', parser, (req, res) => {
    const { id } = req.params;
    const { en, vn } = req.body;
    const objectEdit = { en, vn };
    Word.findByIdAndUpdate(id, objectEdit)
    .then(() => res.redirect('/'))
    .catch(err => res.send(err.message));
});
//**********************************************
const URL = 'mongodb://localhost:27017/shop';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
});