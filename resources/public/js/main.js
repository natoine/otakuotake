
var img1 = document.getElementById("character-1") ; 
var img2 = document.getElementById("character-2") ;
var div1= document.getElementById("char-1");
var div2= document.getElementById("char-2");
var urlfetch = "/get2randomcharacters" ;

fetch(urlfetch).then(function(response){
    response.json().then(function(data){
        img1.setAttribute("src", `/images/${data[0].picture}`);
        img2.setAttribute("src", `/images/${data[1].picture}`);

        var btn1 = document.createElement("button");
        btn1.classList.add("poll");
        btn1.onclick = function() {postPoll(data[0]._id , data[1]._id );} ;
        btn1.innerHTML = `Je vote pour ${data[0].name} !`;
        div1.appendChild(btn1);

        var btn2 = document.createElement("button");
        btn2.classList.add("poll");
        btn2.onclick = function() {postPoll(data[1]._id , data[0]._id );} ;
        btn2.innerHTML = `Je vote pour ${data[1].name} !`;
        div2.appendChild(btn2);
    })
})

function postPoll(idwin, idloose) {
    var body = {win:idwin, loose:idloose};
    var urlpoll = "/poll";
    fetch(urlpoll, {    method:'POST', 
                      body: JSON.stringify(body)  ,
                      headers:{'Content-Type': 'application/json'}, 
                      mode:"cors", 
                      cache:'default'}).then(
        function(response){ console.log(response);})
}
