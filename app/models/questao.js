'use script';

const connection = require('./database.js');

const questao = () => {}


questao.getById = (request, response) => {
    connection.query('SELECT q.*, s.simulado FROM questao AS q '
        + ' INNER JOIN simulado AS s ON s.id = q.simulado_id '
        + ' WHERE q.id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

questao.getByNumeroSimulado = (request, response) => {

    if(!request.body.numero || !request.body.simulado_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('SELECT q.*, s.simulado FROM questao AS q '
        + ' INNER JOIN simulado AS s ON s.id = q.simulado_id '
        + ' WHERE q.numero = ? AND q.simulado_id = ?', [request.body.numero, request.body.simulado_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

questao.getBySimulado = (request, response) => {
    connection.query('SELECT q.*, s.simulado FROM questao AS q '
        + ' INNER JOIN simulado AS s ON s.id = q.simulado_id '
        + ' WHERE q.simulado_id = ?', [request.params.simulado], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

questao.insert = (request, response) => {

    if(!request.body.numero || !request.body.pergunta || !request.body.simulado_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO questao (numero, pergunta, simulado_id) VALUES (?)', 
        [
            [request.body.numero, request.body.pergunta, request.body.simulado_id]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

questao.update = (request, response) => {
    
    if(!request.body.questao_id || !request.body.numero || !request.body.pergunta || !request.body.simulado_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE questao SET numero = ?, pergunta = ?, simulado_id = ? WHERE id = ?', 
        [request.body.numero, request.body.pergunta, request.body.simulado_id, request.body.questao_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

module.exports = questao