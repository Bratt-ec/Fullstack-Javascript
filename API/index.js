const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear server
const app = express();

// Permitir consultas para un dominio en específico
const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) =>{
        // console.log(origin);
        const existe = whiteList.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}
// Habilitar CORS con restricciones
// app.use(cors(corsOptions));
app.use(cors());

// conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Add routes
app.use('/', routes());

// puerto y start server
app.listen(4000, () => {
    console.log(`Server funcionando en puerto 4000`);
});