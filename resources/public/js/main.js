
var img1 = document.getElementById("character-1") ; 
var img2 = document.getElementById("character-2") ;

var urlfetch = "/get2randomcharacters" ;

fetch(urlfetch).then(function(response){
    response.json().then(function(data){
        img1.setAttribute("src", `/images/${data[0].picture}`);
        img2.setAttribute("src", `/images/${data[1].picture}`);
    })
})
