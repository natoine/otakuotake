'use strict'

const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ;
var nbvisit = 0 ;

app.get("/", function(request, response){
    nbvisit ++ ;
    console.log("c'est la " + nbvisit + "éme visite ");
    response.send("hello tout va bien");
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});