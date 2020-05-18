'use script';

const connection = require('./database.js');

const atividade = () => {}


atividade.getById = (request, response) => {
    connection.query('SELECT * FROM atividade WHERE id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

atividade.insert = (request, response) => {
    
    if(!request.body.titulo || !request.body.data || !request.body.usuario_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO atividade (titulo, descricao, data, hora, status, usuario_id) VALUES (?)', 
        [
            [request.body.titulo, request.body.descricao, request.body.data, request.body.hora, request.body.status, request.body.usuario_id]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

atividade.readAtividadesUsuario = (request, response) => {
    
    if(!request.body.usuario_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('SELECT * FROM atividade WHERE usuario_id = ?', 
        [request.body.usuario_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

atividade.update = (request, response) => {
    
    if(!request.body.titulo || !request.body.data || !request.body.usuario_id || !request.body.atividade_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE atividade SET titulo = ?, descricao = ?, data = ?, hora = ?, status = ? WHERE id = ? AND usuario_id = ?', 
        [request.body.titulo, request.body.descricao, request.body.data, request.body.hora, request.body.status, request.body.atividade_id, request.body.usuario_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

atividade.delete = (request, response) => {
    
    if(!request.body.atividade_id || !request.body.usuario_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('DELETE FROM atividade WHERE id = ? AND usuario_id = ?', 
        [request.body.atividade_id, request.body.usuario_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}


module.exports = atividade