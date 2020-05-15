'use script';

const connection = require('./database.js');

const usuario = () => {}


// usuario.read = (request, response) => {
//     connection.query('QUERY', (error, result) => {
//         if(error){
//             console.log('Error: ' + error)
//         }
//         response.statusCode = 200
//         return response.json({data: result})
//     })
// }

usuario.getById = (request, response) => {
    connection.query(`  SELECT u.*, t.tipo FROM usuario AS u 
                        INNER JOIN usuario_has_tipo_usuario AS ut ON ut.usuario_id = u.id
                        INNER JOIN tipo_usuario AS t ON ut.tipo_usuario_id = t.id
                        WHERE u.id = ? AND ativo = 1`, [request.params.id], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

// usuario.update = (request, response) => {
//     connection.query('QUERY', (error, result) => {
//         if(error){
//             console.log('Error: ' + error)
//         }
//         response.statusCode = 200
//         return response.json({data: result.affectedRows})
//     })
// }

usuario.insert = (request, response) => {
    
    if(!request.body.tipo_usuario_id || !request.body.email || !request.body.senha || !request.body.nome || !request.body.data_nascimento){
        response.statusCode = 200
        return response.json({data: 'Requisição inválida'})
    }

    // Irá verificar se o usuário a ser cadastrado é ESTUDANTE, caso não for, será necessário liberar o acesso ao usuário
    var ativo
    if(parseInt(request.body.tipo_usuario_id) === 1){
        ativo = 1
    }
    else{
        ativo = 0
    }

    connection.query('SELECT * FROM usuario WHERE email = ?', 
        [request.body.email], (error, email) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        if(email.length > 0){
            response.statusCode = 200
            return response.json({data: 'Email já está em uso'})
        }
        connection.query('INSERT INTO usuario (email, senha, nome, data_nascimento, ativo) VALUES (?)', 
            [
                [request.body.email, request.body.senha, request.body.nome, request.body.data_nascimento, ativo]
            ], (error, result) => {
            if(error){
                console.log('Error: ' + error.message)
            }

            // Vincular o usuário e o tipo de usuário
            connection.query('INSERT INTO usuario_has_tipo_usuario (usuario_id, tipo_usuario_id) VALUES (?)', 
                [[result.insertId, request.body.tipo_usuario_id]], (error, result) => {
                if(error){
                    console.log('Error: ' + error.message)
                }
            }) 

            response.statusCode = 200
            return response.json({data: result.insertId})
        }) 
    }) 
}

usuario.autenticar = (request, response) => {
    connection.query(`  SELECT u.*, t.tipo FROM usuario AS u 
                        INNER JOIN usuario_has_tipo_usuario AS ut ON ut.usuario_id = u.id
                        INNER JOIN tipo_usuario AS t ON ut.tipo_usuario_id = t.id
                        WHERE u.email = ? AND u.senha = ? AND u.ativo = 1`, [request.body.email, request.body.senha], (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        if(result.length === 0){
            response.statusCode = 200
            return response.json({data: 'Dados inválidos'})
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

module.exports = usuario