'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csvStringifierCharacters = createCsvStringifier({
    header: [
        {id: 'name', title:"NAME"},
        {id: 'picture', title: "PICTURE"}
    ]
});

const port = process.env.PORT || 3000;

const mongodb = require('mongodb');

const urimongo = require("./resources/secret/databaseconfig.js").url;

var cors = require('cors');

//to serve swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//serves static files
app.use(express.static('resources/public'));

app.get("/get2randomcharacters", cors(), function (request, response) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        if (err) console.log("error", err);
        else {
            client.db("otakuotake").collection("characters").find().toArray(function (err, items) {
                if (err) throw err;
                var dblength = items.length;
                var nb1 = Math.floor(Math.random() * dblength);
                var nb2 = Math.floor(Math.random() * dblength);
                while (nb2 == nb1) {
                    nb2 = Math.floor(Math.random() * dblength);
                }
                response.send([items[nb1], items[nb2]]);
            });
        }
    });
});

app.get("/getrandomcharacter", function (request, response) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        if (err) console.log("error", err);
        else {
            client.db("otakuotake").collection("characters").find().toArray(function (err, items) {
                if (err) throw err;
                var dblength = items.length;
                var nb = Math.floor(Math.random() * dblength);
                response.send(items[nb]);
                console.log("response sent");
            });
        }
        console.log("getrandomchar over");
    });
    console.log("getrandomchar really over ?");
});

app.post("/poll", cors(), function (request, response) {
    //récupérer les données de la requête
    var body = request.body;
    //pousser en base de données
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        if (err) console.log("error", err);
        else {
            try {client.db("otakuotake").collection("poll").insertOne(body);}
             catch(error) {
                throw err;
             }
        }
    });
    //répondre ok tout va bien
    response.status(200);
    response.send("votre vote a été sauvegardé !");
})


//export de la base de données
app.get("/exportdataset", function (request, response){
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        if (err) console.log("error", err);
        else {
            client.db("otakuotake").collection("characters").find().toArray(function (err, items) {
                if (err) throw err;
               
                response.format({
                    'application/json': function () {
                        response.setHeader('Content-disposition', 'attachment; filename=score.json'); //do nothing
                        response.set('Content-Type', 'application/json');
                        response.json(items);
                      },
                      'text/csv': function () {
                        response.setHeader('Content-disposition', 'attachment; filename=score.csv'); //do nothing
                        response.set('Content-Type', 'text/csv');
                        let csv ;
                        //build a CSV string with csv-writer
                        csv = csvStringifierCharacters.getHeaderString().concat(csvStringifierCharacters.stringifyRecords(items));
                        response.end(csv);
                      }
                });

            });
        }
    });

})


app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});