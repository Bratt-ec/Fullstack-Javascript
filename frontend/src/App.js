import React, { useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import clienteAxios  from "./config/axios";
// Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

function App() {
  
  // state de la app

  const [citas, guardarCitas] = useState([]);
  const [consulta, setConsulta] = useState(true);
  

  useEffect( ()=> { 
    if(consulta){
          // consumir API externa
    const consultarAPI = () =>{
      clienteAxios.get('/pacientes')
        .then(respuesta =>{
          // colocar en el state
          guardarCitas(respuesta.data);
          // Deshabilitamos la consulta
          setConsulta(false);
        }).catch(error => {
          console.log(error);
        })
    }
    consultarAPI();
    }
  },[consulta]);

  return (
    <Router>
        <Switch>
            <Route 
              exact 
              path="/"
              component= {()=> 
                <Pacientes
                  citas={citas}                  
                />
              }

            />

            <Route 
              exact 
              path="/nueva"
              component= {()=> 
                <NuevaCita                  
                  setConsulta={setConsulta}
                />
              }
            />

            <Route 
              exact 
              path="/cita/:id"
              render={ (props)=>{

                const cita  = citas.filter(cita => cita._id === props.match.params.id);
                
                // console.log(cita);

                return(
                  <Cita
                    cita={cita[0]}
                    setConsulta={setConsulta}
                  />
                )
              }}  
            />
        </Switch>
    </Router>
  );
}

export default App;
