
var img1 = document.getElementById("character-1") ; 
var img2 = document.getElementById("character-2") ;

var urlfetch = "/getrandomcharacter" ;

fetch(urlfetch).then(function(response){
    response.json().then(function(data){
        img1.setAttribute("src", `/images/${data.picture}`);
    })
})

fetch(urlfetch).then(function(response){
    response.json().then(function(data){
        img2.setAttribute("src", `/images/${data.picture}`);
    })
})