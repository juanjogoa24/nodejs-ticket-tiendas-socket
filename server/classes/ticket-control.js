const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        // para poder mostrar los ultimos cuatro tickets
        this.ultimosCuatro = [];
        //colocar los tickets en un array
        this.tickets = [];



        let data = require('../data/data.json');

        //console.log(data);
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
            //console.log('data.ultimosCuatro::', data.ultimosCuatro);
        } else {
            //console.log('iniciar');
            this.reiniciarConteo();

        }

    }

    siguiente() {

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay mas tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        //elimino la primera posicion del arreglo
        this.tickets.shift();
        //creo un nuevo ticket que voy atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //this.ultimosCuatro.push(atenderTicket);
        let array1 = [];
        array1 = this.ultimosCuatro;
        array1.unshift(atenderTicket);

        this.ultimosCuatros = array1;
        // console.log('this.ultimos4::', this.ultimosCuatro);
        if (this.ultimosCuatro.length > 4) {
            //borra el ultimo elemento
            this.ultimosCuatro.splice(-1, 1);
        }

        //console.log('utimos 4');
        //console.log(this.ultimosCuatro);

        this.grabarArchivo();
        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];

        //console.log('Se ha inicializado el Sistema');

        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}


module.exports = {
    TicketControl
}