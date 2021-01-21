'use strict'

const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ;

const mongodb = require('mongodb');

const urimongo = require("./resources/secret/databaseconfig.js").url ;

//serves static files
app.use(express.static('resources/public'));

app.get("/get2randomcharacters", function(request, response) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        if(err) console.log("error" , err);
        else {
            client.db("otakuotake").collection("characters").find().toArray(function(err, items) {
                if(err) throw err;
                var dblength = items.length;
                var nb1 = Math.floor(Math.random()*dblength);
                var nb2 = Math.floor(Math.random()*dblength);
                while(nb2==nb1){
                    nb2 = Math.floor(Math.random()*dblength);
                }
                response.send([items[nb1], items[nb2]]);          
            });
        }
    });
});

app.get("/getrandomcharacter", function(request, response) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        if(err) console.log("error" , err);
        else {
           client.db("otakuotake").collection("characters").find().toArray(function(err, items) {
                if(err) throw err;
                var dblength = items.length;
                var nb = Math.floor(Math.random()*dblength);
                response.send(items[nb]);          
            });
        }
    });
});

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});