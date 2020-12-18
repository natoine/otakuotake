'use strict'

const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ;
var nbvisit = 0 ;

const mongodb = require('mongodb');

const urimongo = require("./resources/secret/databaseconfig.js").url ;
console.log("uri mongodb", urimongo);

//serves static files
app.use(express.static('resources/public'));

app.get("/whatismyname", function(request, response) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        if(err) console.log("error" , err);
        else {
            console.log("connected !");
            client.db("otakuotake").collection("supersayans").find().toArray(function(err, items) {
                if(err) throw err; 
                var nb = Math.floor(Math.random()*2);
                console.log("nb", nb);    
                response.send(items[nb].name);          
            });
        }
    });
});

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});