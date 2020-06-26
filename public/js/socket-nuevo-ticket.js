//comando para establecer la conecion

var socket = io();

var laber = $('#lblNuevoTicket');

// los on son para escuchar
socket.on('connect', function() {
    console.log('Conctado al Servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el Servidor');
});

//seccion que muestra el ultimo ticket cuando carga
socket.on('estadoActual', function(resp) {
    laber.text(resp.actual);
});
//llamada a botton para disparar una funcion
$('button').on('click', function() {

    //los emit son para enviar informacion
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        laber.text(siguienteTicket);
    });

})