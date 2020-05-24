'use script';

const connection = require('./database.js');

const cronogramaVestibular = () => {}


cronogramaVestibular.getById = (request, response) => {
    connection.query('SELECT * FROM cronograma_vestibular WHERE id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

cronogramaVestibular.insert = (request, response) => {

    if(!request.body.data || !request.body.instituicao_has_vestibular_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO cronograma_vestibular (data, instituicao_has_vestibular_id) VALUES (?)', 
        [
            [request.body.data, request.body.instituicao_has_vestibular_id]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

cronogramaVestibular.update = (request, response) => {
    
    if(!request.body.instituicao_has_vestibular_id || !request.body.data || !request.body.id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE cronograma_vestibular SET instituicao_has_vestibular_id = ?, data = ? WHERE id = ? ', 
        [request.body.instituicao_has_vestibular_id, request.body.data, request.body.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

module.exports = cronogramaVestibular