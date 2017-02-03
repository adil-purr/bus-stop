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
    console.log(buses)
    for (var i = 0; i < buses.length; i++) {
      createBus(buses[i])
    }
  })

})

var createBus = function(bus){
  $('.time-box').append('<div class="bus "' + bus.number +'>'+bus.time +'</div>')
}
