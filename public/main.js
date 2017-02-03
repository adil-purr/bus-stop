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

  socket.on('allBusTimes', function(msg){
    console.log(msg)
  })

})
