const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require("dotenv/config")
// const jwt = require('jsonwebtoken')


const usuario = require('./app/models/usuario');
const tipoUsuario = require('./app/models/tipoUsuario');
const atividade = require('./app/models/atividade');
const instituicao = require('./app/models/instituicao');
const vestibular = require('./app/models/vestibular');
const instituicaoVestibular = require('./app/models/instituicaoVestibular');
const cronogramaVestibular = require('./app/models/cronogramaVestibular');
const simulado = require('./app/models/simulado');
const questao = require('./app/models/questao');
const alternativa = require('./app/models/alternativa');


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

app.get('/tipousuario', tipoUsuario.read)

app.get('/atividade/:id', atividade.getById)
app.post('/atividade', atividade.insert)
app.post('/atividadeusuario', atividade.readAtividadesUsuario)
app.put('/atividade', atividade.update)
app.post('/atividadedelete', atividade.delete)

app.get('/instituicao/:id', instituicao.getById)
app.post('/instituicao', instituicao.insert)
app.put('/instituicao', instituicao.update)

app.get('/vestibular/:id', vestibular.getById)
app.post('/vestibular', vestibular.insert)
app.put('/vestibular', vestibular.update)

app.get('/instituicaovestibular/:id', instituicaoVestibular.getById)
app.post('/instituicaovestibular', instituicaoVestibular.insert)
app.put('/instituicaovestibular', instituicaoVestibular.update)

app.get('/cronogramavestibular', cronogramaVestibular.read)
app.get('/cronogramavestibular/:id', cronogramaVestibular.getById)
app.post('/cronogramavestibular', cronogramaVestibular.insert)
app.put('/cronogramavestibular', cronogramaVestibular.update)

app.get('/simulado/:id', simulado.getById)
app.post('/simulado', simulado.insert)
app.put('/simulado', simulado.update)

app.get('/questao/:id', questao.getById)
app.get('/questaosimulado/:simulado', questao.getBySimulado)
app.post('/questaonumerosimulado', questao.getByNumeroSimulado)
app.post('/questao', questao.insert)
app.put('/questao', questao.update)

app.get('/alternativa/:id', alternativa.getById)
app.get('/alternativaquestao/:questao', alternativa.getByQuestao)
app.post('/alternativa', alternativa.insert)
app.put('/alternativa', alternativa.update)

app.listen(app.get('port'), () => {
    console.log("Port " + app.get('port') + " foi inicializada");
})