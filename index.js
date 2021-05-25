'use strict'

const express = require('express');
const app = express();
const bodyParser   = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 3000 ;

const mongodb = require('mongodb');

const urimongo = require("./resources/secret/databaseconfig.js").url ;

var cors = require('cors');

//serves static files
app.use(express.static('resources/public'));

app.get("/get2randomcharacters", cors(), function(request, response) {
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

app.post("/poll", function(request, response) {
    //récupérer les données de la requête
    var body = request.body ;
    console.log("body", body);
    //pousser en base de données

    //répondre ok tout va bien
    response.status(200);
    response.send("votre vote a été sauvegardé !");
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});