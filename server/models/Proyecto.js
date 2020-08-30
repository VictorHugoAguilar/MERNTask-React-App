const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    creador: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);