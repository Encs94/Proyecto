import React from 'react';
import Inicio from './Plantilla';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Contexto from '../Contexto/Contexto';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DatosEnvio() {

  const { usuario } = useContext(Contexto);
  const {register, handleSubmit, formState:{errors}} = useForm();
  const manejarDatos = (datos) => {
    console.log(usuario.id);
  }

  const guardarDatos = (datos) => {
    const datosString = JSON.stringify(datos);
    console.log(datosString);
    console.log(usuario.id)

    // Hay que meter los datos del usuario junto al id
    axios.post(`http://localhost:8080/api/datosPedido`, {
      datos: datosString,
      idUsuario: usuario.id
    })
      .then(response => {
        if(response.status === 200){ 
          console.log("Guardado");
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }

  return (
    <Inicio>
      <div className='contenedorForm'>
        <h2>Datos personales</h2>
        <form onSubmit={handleSubmit(guardarDatos)}>

          <div className='apartadoForm'>
            <label htmlFor="nombre">Nombre</label>
            <input placeholder="Nombre" id='nombre' type="text" 
            {...register('nombre')}/>
          </div>

          <div className='apartadoForm'>
            <label htmlFor="apellidos">Apellidos</label>
            <input placeholder="Apellidos" id='apellidos' type="text" 
            {...register('apellidos')}/>
          </div>

          <div className='apartadoForm'>
            <label htmlFor="direccion">Dirección</label>
            <input placeholder="Dirección" id='direccion' type="text" 
            {...register('direccion')}/>
          </div>

          <div className='apartadoForm'>
            <label htmlFor="telefono">Teléfono</label>
            <input placeholder="Teléfono" id='telefono' type="text" 
            {...register('telefono')}/>
          </div>

          <div className='apartadoForm'>
            <label htmlFor="email">Email</label>
            <input placeholder="Email" id='email' type="text"
            {...register('email',
              {pattern:/^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/}
            )} />
          </div>
          {errors.email?.type === "pattern" && 
          <p>Email no valido</p>}

          {/* <h2>Añadir tarjeta</h2> */}
          <div>
            <label htmlFor="pago">Añadir tarjeta</label>
            <input id='pago' type="text" 
            {...register('pago',
            {pattern:/([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{2})\s*\t*(\d{10})/g}
            )}/>
          </div>
          {errors.pago?.type === "pattern" && 
          <p>Número no válido</p>}
          {/* {console.log(pedido)} */}

          <div>
            <button>Comprar</button>
          </div>
          
        </form>
      </div>
    </Inicio>
  )
}
