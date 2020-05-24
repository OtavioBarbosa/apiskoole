'use script';

const connection = require('./database.js');

const instituicao = () => {}


instituicao.getById = (request, response) => {
    connection.query('SELECT * FROM instituicao WHERE id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

instituicao.insert = (request, response) => {

    if(!request.body.razao_social){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO instituicao (razao_social) VALUES (?)', 
        [
            [request.body.razao_social]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

instituicao.update = (request, response) => {
    
    if(!request.body.instituicao_id || !request.body.razao_social){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE instituicao SET razao_social = ? WHERE id = ?', 
        [request.body.razao_social, request.body.instituicao_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

module.exports = instituicao