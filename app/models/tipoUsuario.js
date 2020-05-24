'use script';

const connection = require('./database.js');

const tipoUsuario = () => {}

tipoUsuario.read = (request, response) => {
    connection.query('SELECT * FROM tipo_usuario', (error, result) => {
        if(error){
            console.log('Error: ' + error)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

module.exports = tipoUsuario