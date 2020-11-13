fetch('http://localhost:4000/pacientes')
    .then(respuesta => respuesta.json())
    .then(datos => mostrarCitas(datos));

function mostrarCitas(citas){
    const contenedor = document.querySelector('#citas');

    let citasHTML;

    citas.forEach(cita => {
        citasHTML += `
            <div class="p-5 list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between mb-4">
                    <h3 class="mb-3">${cita.nombre}</h3>
                    <small class="fecha-alta">
                        ${cita.fecha} - ${cita.hora}
                    </small>
                </div>

                <p class="mb-0">
                    ${cita.sintomas}
                </p>
                <div class="contacto py-1">
                    <h4><b>Dueño:</b> ${cita.propietario}</h4>
                    <p>Teléfono: ${cita.telefono}</p>
                </div> 
            </div>`;
            // insertar el html
            contenedor.innerHTML = citasHTML;
    })
}