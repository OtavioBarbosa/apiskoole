'use script';

const connection = require('./database.js');

const Model = () => {}


Model.read = (request, response) => {
    connection.query('QUERY', (error, result) => {
        if(error){
            console.log('Error: ' + error)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

Model.getById = (request, response) => {
    connection.query('QUERY', (error, result) => {
        if(error){
            console.log('Error: ' + error)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

Model.update = (request, response) => {
    connection.query('QUERY', (error, result) => {
        if(error){
            console.log('Error: ' + error)
        }
        response.statusCode = 200
        return response.json({data: result.affectedRows})
    })
}

Model.insert = (request, response) => {
    connection.query('QUERY', [[VALORES]], (error, result) => {

        if(error){
            response.statusCode = 500
            return response.json({error: error})
        }
        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 
}

module.exports = Endereco