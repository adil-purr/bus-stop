testBus = {
 'number': '1',
 'time': 10
}


$(document).ready(function(){
var socket = io.connect('http://localhost:3000');



  $('#book').on('click',function(){
    var bus = {}
    bus['number']= $('#number').val();
    bus['routeName']= $('#routeName').val();
    bus['time']= $('#time').val();
    console.log(bus)
    socket.emit('busCreate', bus)
    $('.container input').val('')
  });


  socket.on('allBusTimes', function(buses){
    $('#totalBuses').text('Total Buses: ' + buses.length)
    updateBusElements(buses)
  })

  socket.on('queTime', function(queTime){
    $('#que').text('Time till last bus ' + str_pad_left(queTime.minutes, '0', 2) + ':' + str_pad_left(queTime.seconds, '0', 2))
  })


  var createBusElement = function(bus){
    $('.time-box').prepend('<div id="bus'+bus.id+'" class="bus number' + bus.number +'">Bus Number: '+bus.number+' to '+ bus.routeName +' is coming in <p class="time">' +bus.time +'</p> seconds.</div>')
  }

  var updateBusElements = function(busArray){
    for (var i = 0; i < busArray.length; i++) {
      if( existingBus(busArray[i]) ){
        updateBus(busArray[i])
      }
      else{
        createBusElement(busArray[i])
      }
    }
  }


  var updateBus = function(bus){
    if(bus.time <= 0){
      departingBus(bus)
    }
    else{
      $('#bus'+bus.id).children().first().text(bus.time);
    }

  }

  var existingBus = function(bus){
    return $('#bus'+bus.id).length === 1
  }

  var departingBus = function(bus){
    $('.bus.number'+bus.number).text('Bus number '+ bus.number +' has arrived')

    setTimeout(function(){
      $('#bus'+bus.id).remove()
    }, 500)

  }

})

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}
