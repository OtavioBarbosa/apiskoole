'use script';

const connection = require('./database.js');

const alternativa = () => {}


alternativa.getById = (request, response) => {
    connection.query('SELECT * FROM alternativa WHERE id = ? ', [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

alternativa.getByQuestao = (request, response) => {
    connection.query('SELECT * FROM alternativa WHERE questao_id = ? ', [request.params.questao], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

alternativa.insert = (request, response) => {

    if(!request.body.opcao || !request.body.texto || !request.body.questao_id || !request.body.correta){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('INSERT INTO questao (opcao, texto, correta, questao_id) VALUES (?)', 
        [
            [request.body.opcao, request.body.texto, request.body.correta, request.body.questao_id]
        ], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result.insertId})
    }) 

}

alternativa.update = (request, response) => {
    
    if(!request.body.opcao || !request.body.texto || !request.body.questao_id || !request.body.correta || !request.body.alternativa_id){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    connection.query('UPDATE alternativa SET opcao = ?, texto = ?, correta = ?, questao_id = ? WHERE id = ?', 
        [request.body.opcao, request.body.texto, request.body.correta, request.body.questao_id, request.body.alternativa_id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }

        response.statusCode = 200
        return response.json({data: result})
    }) 

}

module.exports = alternativa