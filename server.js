const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Model = require('./app/models/model');
require("dotenv/config")
// const jwt = require('jsonwebtoken')

app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // response.header('Content-Type', 'application/json')
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: '*'
}))
app.set('port', process.env.PORT || 3003);

// const verificar = (request, response, next) => {
//     var token = request.headers['x-access-token']
//     if(!token){
//         response.statusCode = 500
//         return response.json({data: 'Token inválido ou inexistente'}) 
//     }
//     jwt.verify(token, process.env.SECRET, function(erro, decodificar) {
//         if(erro){
//             response.statusCode = 500
//             return response.json({data: 'Token inválido ou inexistente'}) 
//         } 
//         request.userId = decodificar.id
//         next()
//     });
// }

app.get('/model', Model.read)
app.get('/model/:id', Model.getById)
app.put('/model', Model.update)
app.post('/model', Model.insert)

app.listen(app.get('port'), () => {
    console.log("Port " + app.get('port') + " foi inicializada");
})