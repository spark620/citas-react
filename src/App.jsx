import { useState, useEffect } from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Heder"
import ListadoPacientes from "./components/ListadoPacientes"
import Paciente from './components/Paciente';


//props pasan variables o funciones de un componente a otro.



function App() {

  const [pacientes, setPacientes]= useState([]);
  const [paciente, setPaciente]= useState({});

  useEffect(()=>{
    const obtenerLS=() =>{
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS();
  },[]);
  
  useEffect(()=>{
  localStorage.setItem('pacientes',JSON.stringify(pacientes));
  },[pacientes])

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
    setPacientes(pacientesActualizados)
  }


  return (
    <div className = "container mx-auto mt-20">
     <Header/>
        <div className="mt-12 flex">
            <Formulario
            pacientes ={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
            />
            <ListadoPacientes
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
            />
        </div>
    </div>
  )
}

export default App
