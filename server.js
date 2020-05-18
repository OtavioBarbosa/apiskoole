const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require("dotenv/config")
// const jwt = require('jsonwebtoken')


const usuario = require('./app/models/usuario');
const tipo_usuario = require('./app/models/tipo_usuario');
const atividade = require('./app/models/atividade');



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

// app.get('/usuario', usuario.read)
app.get('/usuario/:id', usuario.getById)
// app.put('/usuario', usuario.update)
app.post('/usuario', usuario.insert)
app.post('/autenticar', usuario.autenticar)

app.get('/tipousuario', tipo_usuario.read)

app.get('/atividade/:id', atividade.getById)
app.post('/atividade', atividade.insert)
app.post('/atividadeusuario', atividade.readAtividadesUsuario)
app.put('/atividade', atividade.update)
app.post('/atividadedelete', atividade.delete)


app.listen(app.get('port'), () => {
    console.log("Port " + app.get('port') + " foi inicializada");
})