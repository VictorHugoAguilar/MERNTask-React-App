const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

 const conectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        const conexion = { 
            name: mongoose.connections[0].name,
            host: mongoose.connections[0].host,
            port:mongoose.connections[0].port
        }
        
        console.log('DB conectada => ', conexion );
    }catch(error){
       error = {
            ok: error.ok, 
            code: error.code,
            codeName: error.codeName,
            name: error.name
        }
        console.log(error);
        process.exit(1); // detener la app
    }
 }
 module.exports = conectDB;