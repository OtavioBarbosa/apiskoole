'use script';

const connection = require('./database.js');

const simulado = () => {}


simulado.getById = (request, response) => {
    connection.query('SELECT * FROM simulado WHERE id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

simulado.insert = (request, response) => {

    if(!request.body.simulado){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO simulado (simulado) VALUES (?)', 
        [
            [request.body.simulado]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

simulado.update = (request, response) => {
    
    if(!request.body.simulado_id || !request.body.simulado){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE simulado SET simulado = ? WHERE id = ?', 
        [request.body.simulado, request.body.simulado_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

module.exports = simulado