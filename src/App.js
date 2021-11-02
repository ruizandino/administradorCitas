import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';



function App() {

    //citas en local storage
    let citasIniciales = JSON.parse( localStorage.getItem('citas') );
    //en caso de que no existan citas guardadas en local storage se inicializa un arreglo vacio
    if (!citasIniciales ){
      citasIniciales=[]; 
    }

    //arreglo de todas las citas
    const [citas, guardarCitas]=useState( citasIniciales );

    //useEffect para realizar ciertas operaciones cuando el state cambia
   //cada vez que el state de citas cambie se va a volver a ejecutar el useEffect
   //va a estar pendiente a los cambios y va a reacccionar a ello
   useEffect( () => {
     //console.log('Documento listo o algo pasó con citas');
     if(citasIniciales){
       localStorage.setItem('citas', JSON.stringify(citas));
     }else{
       localStorage.setItem('citas', JSON.stringify( [] ));
     }
    }, [citas, citasIniciales]  ); 

    //funcion que toma las citas actuales y agregue las nuevas
    const crearCita = cita => {
      
      guardarCitas([ 
          ...citas, //copiamos las citas que haya
          cita //le pasamos la nueva cita
      ]);

    }

    //funcion que elimina una cita por su id
    const eliminarCita= id => {
      const nuevasCitas = citas.filter( cita => cita.id !== id) 
      guardarCitas(nuevasCitas); //cambio el state
    }
    //mensaje condicional
    const titulo = citas.length === 0  ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
     
     <h1>
       ADMINISTRADOR DE PACIENTES
     </h1>
     <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
          crearCita= {crearCita}
          />

       </div>
       <div className="one-half column">
          <h2>{titulo}</h2>
          { citas.map(cita => (
            <Cita               
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
          />
          ) ) }

       </div>  
       </div>
     </div>

   </Fragment>
  );
}



export default App;
