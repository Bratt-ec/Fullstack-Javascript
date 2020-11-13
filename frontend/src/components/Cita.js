import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Cita = (props) => {
    
    if(!props.cita) {
        props.history.push('/');
        return null;
    }

    // Extraemos los props
    const {cita: {_id,nombre,propietario, fecha,hora,telefono, sintomas} } =  props;

    const eliminarCita = id =>{
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Una cita eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText:'Cancelar'
        }).then((result) => {
            if (result.value) {

                clienteAxios.delete(`/pacientes/${id}`)
                .then(respuesta => {
                    // Alerta de eliminado
                    Swal.fire(
                        'Eliminado!',
                        `El registro de ${nombre} fue eliminado`,
                        'success'
                    )
                    props.setConsulta(true);
                    props.history.push('/');
                    // console.log(respuesta);
                })
                .catch( error => {
                    console.log(error);
                });
            }
        });
        
    }
    return ( 
        <Fragment>
            <h1 className="my-5"> Nombre cita: {nombre} </h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-info text-uppercase py-2 px-5 font-weight-bold">Volver</Link>                        
                    </div>
                </div>
                <div className="col-md-8 mx-auto bg-white p-5 bordered">
                    <div className="list-group">
                        <div className="d-flex w-100 justify-content-between mb-4">
                            <h3 className="mb-3"> { nombre } </h3>
                            <small className="fecha-alta">
                                {fecha} - {hora}
                            </small>
                        </div>
                        <p className="mb-0">
                            {sintomas}
                        </p>
                        <div className="contacto py-3">
                            <h4><b>Dueño:</b> {propietario} </h4>
                            <h4><b>Teléfono:</b> {telefono} </h4>
                        </div>
                        <div className="d-flex">
                            <button
                                type="button"
                                className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                                onClick={ ()=> eliminarCita(_id)}
                            > Eliminar </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default withRouter(Cita);