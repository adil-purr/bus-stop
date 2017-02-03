$(document).ready(function(){
  var socket = io();


  $('#send').on('click',function(){
    time = $('#m').val();
    bus = {'time': time}
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
