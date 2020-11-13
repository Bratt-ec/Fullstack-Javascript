const express = require('express');
const router =  express.Router();
const pacienteContrller = require('../controllers/pacienteControllers');

module.exports =  function() {
    // Add nuevos pacientes con Post
    router.post('/pacientes', pacienteContrller.nuevoCliente);

    // Obtener clientes con GET
    router.get('/pacientes', pacienteContrller.obtenerPacientes );

    // Obtiene paciente x ID
    router.get('/pacientes/:id', pacienteContrller.obtenerPaciente);

    // Actualizar dato x ID con PUT
    router.put('/pacientes/:id', pacienteContrller.actualizarPaciente);

    // Eliminar dato x ID con Delete
    router.delete('/pacientes/:id', pacienteContrller.eliminarPaciente);

    return router;
}