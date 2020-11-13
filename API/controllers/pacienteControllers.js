const Paciente = require('../models/paciente');

// Add nuevo cliente
exports.nuevoCliente = async (req, res, next) =>{
    // crear obj de paciente con datos del req.body
    const paciente = new Paciente(req.body);
    try {
        await paciente.save();
        res.json({ mensaje: 'Cliente agregado' });
    } catch (error) {
        console.log(error);
        next();
    }
}
// Obtiene todos los pacientes
exports.obtenerPacientes =  async (req,res, next) => {
    try {
        const pacientes = await Paciente.find({});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}
// obtiene un paciente por su ID
exports.obtenerPaciente = async (req,res,next) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);
    } catch (error) {
        console.log(error);
    }
}
// Actualiza un pacientes por su ID
exports.actualizarPaciente = async (req,res,next) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate({_id: req.params.id}, req.body,{
            new: true
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
    }
}
// Elimina paciente x ID
exports.eliminarPaciente = async (req,res,next) => {
    try {
        await Paciente.findOneAndDelete({_id : req.params.id});
        res.json({ mensaje: 'El paciente fue elimnado'});
    } catch (error) {
        console.log(error);
    }
}