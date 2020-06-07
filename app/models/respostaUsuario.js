'use script';

const connection = require('./database.js');

const respostaUsuario = () => {}


respostaUsuario.getById = (request, response) => {
    connection.query('SELECT qu.*, q.numero, q.pergunta, q.simulado_id, s.simulado, a.opcao, a.texto, a.correta FROM questao_has_usuario AS qu '
        + ' INNER JOIN questao AS q ON q.id = qu.questao_id '
        + ' INNER JOIN simulado AS s ON s.id = q.simulado_id '
        + ' INNER JOIN alternativa AS a ON a.id = qu.usuario_alternativa_id '
        + ' WHERE qu.id = ?', [request.params.id], (error, result) => {
            if(error){
                console.log('Error: ' + error.message)
            }
        response.statusCode = 200
        return response.json({data: result})
    })
}

respostaUsuario.insert = (request, response) => {
    
    if(!request.body.questao_id || !request.body.usuario_id || !request.body.alternativa_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }
    
    connection.query('INSERT INTO questao_has_usuario (questao_id, usuario_id, usuario_alternativa_id) VALUES (?)', 
    [
        [request.body.questao_id, request.body.usuario_id, request.body.alternativa_id]
    ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        
        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 
    
}

respostaUsuario.readRespostasSimulado = (request, response) => {
    
    if(!request.body.usuario_id || !request.body.simulado_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }
    
    connection.query('SELECT qu.*, q.numero, q.pergunta, q.simulado_id, s.simulado, a.opcao, a.texto, a.correta FROM questao_has_usuario AS qu '
    + ' INNER JOIN questao AS q ON q.id = qu.questao_id '
    + ' INNER JOIN simulado AS s ON s.id = q.simulado_id '
    + ' INNER JOIN alternativa AS a ON a.id = qu.usuario_alternativa_id '
    + ' WHERE q.simulado_id = ? AND qu.usuario_id = ?', 
    [request.body.simulado_id, request.body.usuario_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 
    
}

respostaUsuario.readRespostasUsuario = (request, response) => {
    
    if(!request.body.usuario_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }
    
    connection.query('SELECT qu.*, q.numero, q.pergunta, q.simulado_id, s.simulado, a.opcao, a.texto, a.correta FROM questao_has_usuario AS qu '
    + ' INNER JOIN questao AS q ON q.id = qu.questao_id '
    + ' INNER JOIN simulado AS s ON s.id = q.simulado_id '
    + ' INNER JOIN alternativa AS a ON a.id = qu.usuario_alternativa_id '
    + ' WHERE qu.usuario_id = ?', 
        [request.body.usuario_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}


module.exports = respostaUsuario