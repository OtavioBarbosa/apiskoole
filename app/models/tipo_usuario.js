'use script';

const connection = require('./database.js');

const tipo_usuario = () => {}

tipo_usuario.read = (request, response) => {
    connection.query('SELECT * FROM tipo_usuario', (error, result) => {
        if(error){
            console.log('Error: ' + error)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

module.exports = tipo_usuario