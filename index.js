'use strict'

const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ;

app.get("/", function(request, response){
    console.log('quelquun me parle !');
    response.send("hello tout va bien");
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});