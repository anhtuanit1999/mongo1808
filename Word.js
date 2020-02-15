const mongoose = require('mongoose');
const URL = 'mongodb://localhost:27017/shop';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongoose.connection.once('open', () => {
    console.log('Hello');
});

// const Schema = mongoose.Schema;
// const WordSchema = new Schema({
//     en: String,
//     vn: String
// });

// const Word = mongoose.model('Word', WordSchema);
// const remote = new Word({ en: "remote", vn: "Điều khiển" });
// remote.save().then((value) => {
//     console.log(value);
// });

