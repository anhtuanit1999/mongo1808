const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const WordSchema = new Schema({
    en: String,
    vn: String
});

const Word = mongoose.model('Word', WordSchema);

// const remote = new Word({ en: "remote", vn: "Điều khiển" });
// remote.save().then((value) => {
//     console.log(value);
// });

module.exports = Word;

