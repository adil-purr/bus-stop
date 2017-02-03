$(document).ready(function(){
  var socket = io();


  $('#send').on('click',function(){
    number = $('#m').val();
    bus = {
      'number': number,
      'time' : 100
    }
    socket.emit('bus message', bus);
    $('#m').val('');
    return false;
  });

  $('#getTimes').on('click', function(){
    socket.emit('getTimes');
  })

  socket.on('allBusTimes', function(buses){
    // console.log(buses)
    updateBusElements(buses)
  })

})

var createBusElement = function(bus){
  $('.time-box').prepend('<div class="bus ' + bus.number +'">Bus Number:'+bus.number+' is coming in <p class="time">' +bus.time +'</p> seconds.</div>')
}

var updateBusElements = function(busArray){
  for (var i = 0; i < busArray.length; i++) {
    if($('.bus.'+busArray[i].number).length == 1){
      $('.bus.'+busArray[i].number).children().first().text(busArray[i].time);
    }
    else{
      createBusElement(busArray[i])
    }
  }
}
