import { useEffect, useState } from 'react';
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  /**
   * Nota: En las últimas versiones de Reactj, ya no es necesario crear un useEffect para obtener
   * el valor del localStorage. Ahora se puede poner sin problema alguno en el useState.
   */
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente, setPaciente] = useState({});


  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const eliminarPaciente = id => setPacientes(pacientes.filter(p => p.id !== id));

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes} 
          paciente={paciente}
          setPaciente={setPaciente}/>
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}/>
      </div>

    </div>
  )
}

export default App;
