const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

//const ticketControl = require('../models/producto');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let numTicket = ticketControl.siguiente();
        callback(numTicket);
    });

    //emitir un evento 'estadoActual' devuelve el ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    })

    client.on('atenderTicket', (data, callback) => {

        //console.log('data::', data.escritorio.length);
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar o notificar los ultimos cuatros

        client.broadcast.emit('estadoActualDos', {

            ultimosCuatro: ticketControl.getUltimosCuatro()
        })

    })

});