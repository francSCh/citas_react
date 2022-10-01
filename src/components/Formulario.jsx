import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);


  const generarId = () => (Math.random().toString(36).substring(2)) + (Date.now().toString(36));

  const handleSubmmit = (e) => {
    e.preventDefault();

    //Validación del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true);
      return;
    }

    setError(false);

    //Objeto de Paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

    if(paciente.id) {
      //Editando registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map(p => p.id === paciente.id ? objetoPaciente : p);
      setPacientes(pacientesActualizados);
      setPaciente({});
    }else{
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    
    //Reiniciamos el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
          Añade Pacientes y {''} 
          <span className="text-indigo-600 font-bold">Adminístralos</span>
        </p>

        <form onSubmit={handleSubmmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

          {error && <Error><p>Todos los Campos son obligatorios</p></Error>}

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre de la Mascota</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="mascota" type="text" placeholder="Hook" value={nombre} onChange= {(e) => setNombre(e.target.value)}/>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre del Propietario</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="propietario" type="text" placeholder="Pedro García"  value={propietario} onChange= {(e) => setPropietario(e.target.value)}/>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="email" type="email" placeholder="pedro@correo.com.mx" value={email} onChange= {(e) => setEmail(e.target.value)}/>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Fecha</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="alta" type="date"  
            value={fecha} onChange= {(e) => setFecha(e.target.value)}/>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
            <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="sintomas" placeholder="Describe los síntomas de la mascota"  value={sintomas} onChange= {(e) => setSintomas(e.target.value)}></textarea>
          </div>

          <input className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" type="submit" 
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}/>
          
        </form>
    </div>
  )
}

export default Formulario
