import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; //genera id
import { PropTypes } from 'prop-types';

const Formulario= ({crearCita}) => {
    //crear stat de citas, 
    const [cita, actualizarcita]= useState({ // va a tener toda la info del stado y la funcion que lo reescribe
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas:''
    });

    //nombre del state, y funcion que lo modifica
    const[error, actualizarError]= useState(false);

    //funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState= e =>{
        actualizarcita({
            ...cita, //copiamos el state para luego reescribirlos
            [e.target.name] : e.target.value
        })
    }

    //extraer los valores (para evitar usar cita.mascota etc)
    const { mascota, propietario, fecha, hora, sintomas }= cita;

    //cuando el usuario presiona agregar cita
    const submitCita= e =>{
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || propietario.trim()=== ''
        || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return ;
        }

        //eliminar mensaje previo
        actualizarError(false);

        //Asignar un id unico
        cita.id= uuidv4();   

        //crear la cita 
        crearCita(cita);

        //reiniciar el form
        actualizarcita({ //reiniciamos cada una de las propiedades
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas:''
        })
    }

    return (
       <Fragment>
           { error ? <p className="alerta-error">Todos los campos son obligatorios</p>  : null}
           <h2 className="title-form"> Crear Cita</h2>
           <form
            onSubmit={submitCita}
           >
               <label>Nombre Mascota </label>
               <input
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre de la Mascota"
                onChange={actualizarState}
                value={mascota}
               />

                <label>Nombre del Dueño </label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>fecha </label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"  
                    onChange={actualizarState} 
                    value={fecha}                
                />

                <label>hora </label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState} 
                    value={hora}                  
                />

                <label>Sintomas </label>
                <textarea 
                className="u-full-width" 
                name="sintomas"
                onChange={actualizarState}
                value={sintomas}
                >                
                </textarea>

                <button 
                type="submit"
                className="u-full-width button-primary"
                >Agregar Cita

                </button>
               
           </form>
       </Fragment>
    )

}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired //es una funcion 
}

export default Formulario;