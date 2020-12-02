'use strict'

const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ;
var nbvisit = 0 ;

const mongodb = require('mongodb');
const dbuser = "username" ;
const dbpass = "password";

const urimongo = `mongodb://${dbuser}:${encodeURIComponent(dbpass)}@ds139341.mlab.com:39341/otakuotake`;
console.log("uri mongodb", urimongo);

//serves static files
app.use(express.static('resources/public'));

app.get("/whatismyname", function(request, response) {
    mongodb.MongoClient.connect(urimongo, function (err, db) {
        if(err) console.log("error" , err);
        else {
            console.log("connected !");
        }
    });
});

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});