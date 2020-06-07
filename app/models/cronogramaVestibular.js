'use script';

const connection = require('./database.js');

const cronogramaVestibular = () => {}


cronogramaVestibular.read = (request, response) => {
    connection.query('SELECT cv.*, iv.instituicao_id, iv.vestibular_id, i.razao_social, v.vestibular FROM cronograma_vestibular AS cv'
        + ' INNER JOIN instituicao_has_vestibular AS iv ON iv.id = cv.instituicao_has_vestibular_id '
        + ' INNER JOIN instituicao AS i ON i.id = iv.instituicao_id '
        + ' INNER JOIN vestibular AS v ON v.id = iv.vestibular_id ORDER BY cv.data', (error, result) => {
        if(error){
            console.log('Error: ' + error.message)
        }
        response.statusCode = 200
        return response.json({data: result})
    })
}

cronogramaVestibular.getById = (request, response) => {
    connection.query('SELECT cv.*, iv.instituicao_id, iv.vestibular_id, i.razao_social, v.vestibular FROM cronograma_vestibular AS cv'
        + ' INNER JOIN instituicao_has_vestibular AS iv ON iv.id = cv.instituicao_has_vestibular_id '
        + ' INNER JOIN instituicao AS i ON i.id = iv.instituicao_id '
        + ' INNER JOIN vestibular AS v ON v.id = iv.vestibular_id WHERE cv.id = ? ', [request.params.id], (error, result) => {
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