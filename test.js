import { Db } from "mongodb";

db.employee.insert({
    fullname: "Pham Anh Tuan",
    birth_year: "1999",
    email: "anhtuanit@gmail.com",
    group: ["iuh", "Kter"]
});

db.employee.updateOne(
    { "fullname" : "Pham Anh Tuan" },
    { $set: {"birth_year" : "1998" } },
    { upsert: true }
);

db.employee.find({ fullname: "Pham Anh Tuan" }).pretty();

let em = db.employee;
em.find().pretty();

db.employee.remove({ fullname: "Pham Anh Tuan 1" });

db.dropDatabase();

use shop
db.words.insert({
    en: "goodbye",
    vn: "tam biet"
})

db.words.deleteOne({
    "_id" : ObjectId("5e47c981ff540ed7cf4dff95")
});

let w = db.words;
w.find().pretty();

w.find({}, { vn: 1 });
w.find({}, { vn: 1, _id: 0 });