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
  socket.on('busCreate', function(msg){
  bus = new Bus(msg.number, msg.routeName, msg.time)
  allBuses.push(bus)
  });

  socket.on('bus message', function(msg){
    // console.log(msg)
    allBuses.push(msg)
  })




  setInterval(function(){
    // console.log(allBuses)
    io.emit('allBusTimes', allBuses)
    io.emit('queTime', queTime)
  }, 500)



});

var allBuses = []
var queTime = {}

function Bus(number, routeName, time, id){
  this.number = number;
  this.routeName = routeName;
  this.time = time || 100;
  this.id = id || allBuses.length + 1
}

bus = new Bus(1, 'Trafalgar Square')
allBuses.push(bus)
bus2 = new Bus(2, 'Blackfriars', 150, 2)
allBuses.push(bus2)


setInterval(function(){
  for (var i = 0; i < allBuses.length; i++) {
    busTick(allBuses[i])
    if(allBuses[i].time < 0){
      allBuses.splice(i, 1)
    }
  }
}, 1000)

setInterval(function(){
  bus = new Bus(1, 'Trafalgar Square')
  allBuses.push(bus)
}, 100000)

setInterval(function(){
  bus = new Bus(2, 'Black Friars')
  allBuses.push(bus)
}, 80000)

setInterval(function(){
  timeArray = allBuses.map(function(a){ return a.time;})
  totalSeconds = timeArray.reduce(function(a,b){return a + b}, 0)
  queTime['minutes'] = Math.floor(totalSeconds / 60);
  queTime['seconds'] = totalSeconds - queTime['minutes'] * 60;
  console.log(queTime)
}, 500)





var busTick = function(bus){
  bus.time -= 1
}

var calculateQueTime = function(){
  timeArray = allBuses.map(function(a){ return a.time;})
  totalSeconds = timeArray.reduce(function(a,b){return a + b}, 0)
  queTime['minutes'] = Math.floor(totalSeconds / 60);
  queTime['seconds'] = totalSeconds - queTime['minutes'] * 60;
  console.log(queTime)
}
