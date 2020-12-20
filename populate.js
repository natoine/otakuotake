'use strict'
const fs = require('fs');
const mongodb = require('mongodb');
const urimongo = require("./resources/secret/databaseconfig.js").url;

let rawdata = fs.readFileSync("resources/database/characters.json");
let charactersarray = JSON.parse(rawdata);

mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
    var dbcol = client.db("otakuotake").collection("characters");
    dbcol.insertMany(charactersarray);
    console.log("db inserted");
});
