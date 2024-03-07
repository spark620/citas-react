import { useState,useEffect } from 'react';
import Error from './Error';


const Formulario = ({pacientes ,setPacientes,paciente,setPaciente}) => {
 
      const [nombre, setNombre]= useState('');
      const [propietario, setPropietario]= useState('');
      const [email, setEmail]= useState('');
      const [fecha, setFecha]= useState('');
      const [sintomas, setSintomas]= useState('');
  
      //---> estos son eventos de hook se usan para capturar la variable y guardar la informacion de los formularios

      useEffect(()=>{
        if(Object.keys(paciente).length > 0){
          setNombre(paciente.nombre);
          setPropietario(paciente.propietario);
          setEmail(paciente.email);
          setFecha(paciente.fecha);
          setSintomas(paciente.sintomas);
        }
      }, [paciente])

      const[error, setError]= useState(false);


      //constante de error
      const handleSubmit = (e) =>{
        e.preventDefault()

      //generar id
        const generarID = ()=>{
          const random =Math.random().toString(36).substring(2);
          const fecha = Date.now().toString(36);
          return fecha + random;
        }
        //validacion del formulario
        if([nombre,propietario,email,fecha,sintomas].includes('')){
          console.log("Hay al menos un campo vacio")
          setError (true)
          return;
        }

        setError(false)

        //Objeto del paciente.
        const objetoPaciente={
          nombre,
          propietario,
          email,
          fecha,
          sintomas,
          id: generarID()
        }


        if (paciente.id){
          //editando el registro
          objetoPaciente.id = paciente.id
          const paciantesActualizados= pacientes.map(pacienteState =>pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
          setPacientes(paciantesActualizados)
          setPaciente({})
         
        } else {
          //nuevo registro  
          objetoPaciente.id =generarID();
          setPacientes([...pacientes,objetoPaciente])
        }
        //console.log(objetoPaciente)


    

        ///Reiniciar al Form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

      }
        //funcion para el envio de los datos o el evento submit



  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
      <p className="text-lg mt-5 text-center"> 
        Añade Paciente y {''}
        <span className="text-indigo-600 font-bold"> Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className ="bg-white shadow- rounded-r-lg py-10 px-5 mb-10"> 
          {error && <Error><p>Todos los campos son obligatorios</p></Error> }
          <div className="mb-5">
              <label htmlFor="mascota" className = "block text-gray-700 uppercase font-bold">Nombre mascota {nombre}</label>
              <input
              id="mascota"
              type="text"
              placeholder="Nombre de la Mascota "
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange ={(e)=> setNombre(e.target.value)}
              />
          </div>
          <div className="mb-5">
              <label htmlFor="propietario" className = "block text-gray-700 uppercase font-bold">Nombre Propietario</label>
              <input
              id="propietario"
              type="text"
              placeholder="Nombre del propietario "
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange ={(e)=> setPropietario(e.target.value)}
              />
          </div>
          <div className="mb-5">
              <label htmlFor="email" className = "block text-gray-700 uppercase font-bold">Email</label>
              <input
              id="email"
              type="email"
              placeholder="Email del propietario "
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange ={(e)=> setEmail(e.target.value)}
              />
          </div>
          <div className="mb-5">
              <label htmlFor="alta" className = "block text-gray-700 uppercase font-bold">Alta</label>
              <input
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange ={(e)=> setFecha(e.target.value)}
              />
          </div>
          <div className="mb-5">
              <label htmlFor="alta" className = "block text-gray-700 uppercase font-bold">Sintomas</label>
              <textarea
              id="sintomas"
              className= "border-2 w-full mt-2 placeholder-gray-400 rounded-md"
              placeholder = "Describa los Sintomas"
              value={sintomas}
              onChange ={(e)=> setSintomas(e.target.value)}
              />

              
          </div>
          <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all border-2 rounded-md"
          value = {paciente.id ? 'Editar paciente':'Agregar Paciente'}
          />
          
      </form>

    </div>
  )
}

export default Formulario
