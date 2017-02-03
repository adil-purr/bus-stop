var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);





app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected')
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.use(express.static('public'))

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  socket.on('bus message', function(msg){
    console.log(msg)
    allBuses.push(msg)
  })


  setInterval(function(){
    io.emit('allBusTimes', allBuses)
  }, 2000)

});

var allBuses = []

setInterval(function(){
  for (var i = 0; i < allBuses.length; i++) {
    allBuses[i].time -= 1
    if(allBuses[i].time <= 0){
      allBuses.splice(i, 1)
    }

  }
}, 1000)



var busTick = function(bus){
  bus.time -= 1
}
