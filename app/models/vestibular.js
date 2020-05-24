'use script';

const connection = require('./database.js');

const vestibular = () => {}


vestibular.getById = (request, response) => {
    connection.query('SELECT * FROM vestibular WHERE id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

vestibular.insert = (request, response) => {

    if(!request.body.vestibular){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO vestibular (vestibular) VALUES (?)', 
        [
            [request.body.vestibular]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

vestibular.update = (request, response) => {
    
    if(!request.body.vestibular_id || !request.body.vestibular){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE vestibular SET vestibular = ? WHERE id = ?', 
        [request.body.vestibular, request.body.vestibular_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

module.exports = vestibular