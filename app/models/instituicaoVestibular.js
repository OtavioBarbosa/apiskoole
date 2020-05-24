'use script';

const connection = require('./database.js');

const instituicaoVestibular = () => {}


instituicaoVestibular.getById = (request, response) => {
    connection.query('SELECT * FROM instituicao_has_vestibular WHERE id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

instituicaoVestibular.insert = (request, response) => {

    if(!request.body.vestibular_id || !request.body.instituicao_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO instituicao_has_vestibular (instituicao_id, vestibular_id) VALUES (?)', 
        [
            [request.body.instituicao_id, request.body.vestibular_id]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

instituicaoVestibular.update = (request, response) => {
    
    if(!request.body.vestibular_id || !request.body.instituicao_id || !request.body.id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE instituicao_has_vestibular SET instituicao_id = ?, vestibular_id = ? WHERE id = ? ', 
        [request.body.instituicao_id, request.body.vestibular_id, request.body.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

module.exports = instituicaoVestibular