'use strict'

const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ;
var nbvisit = 0 ;

//serves static files
app.use(express.static('resources/public'));

app.get("/whatismyname", function(request, response) {
    response.send("Broly");
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});