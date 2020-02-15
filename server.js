const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

const URL = 'mongodb://localhost:27017/shop';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
});