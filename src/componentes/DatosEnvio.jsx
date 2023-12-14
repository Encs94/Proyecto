import React from 'react';
import Inicio from './Plantilla';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Contexto from '../Contexto/Contexto';
import axios from 'axios';

export default function DatosEnvio() {

  const { usuario } = useContext(Contexto);
  const {register, handleSubmit, formState:{errors}} = useForm();

  const guardarDatos = (datos) => {
    const datosString = JSON.stringify(datos);

    // Peticion post para agregar los datos del usuario con su id
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
      <div className='contenerdorEnvios'>
        <div className='datos'>
          
          <div className='contenerdorTituloDatos'>
            <div className='tituloDatos'>
              <p className='parrafosDatos'>Información de envio</p>
              <p className='parrafosDatos'>y</p>
              <p className='parrafosDatos'>pago</p>
              <h4 className='parrafo2Datos'>Solo a un paso de su compra !</h4>
            </div>
          </div>

          <div className='contenedorForm'>
            <h2 className='tituloFormDatos'>Información</h2>
            <form onSubmit={handleSubmit(guardarDatos)}>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="nombre">Nombre</label>
                <input className='inputDatos' id='nombre' type="text" 
                {...register('nombre')}/>
              </div>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="apellidos">Apellidos</label>
                <input className='inputDatos' id='apellidos' type="text" 
                {...register('apellidos')}/>
              </div>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="direccion">Dirección</label>
                <input className='inputDatos' id='direccion' type="text" 
                {...register('direccion')}/>
              </div>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="telefono">Teléfono</label>
                <input className='inputDatos' id='telefono' type="text" 
                {...register('telefono')}/>
              </div>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="email">Email</label>
                <input className='inputDatos' id='email' type="text"
                {...register('email',
                  {pattern:/^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/}
                )} />
              </div>
              {errors.email?.type === "pattern" && 
              <p>Email no valido</p>}

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="pago">Añadir tarjeta</label>
                <input className='inputDatos' id='pago' type="text" 
                {...register('pago',
                {pattern:/([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{2})\s*\t*(\d{10})/g}
                )}/>
              </div>
              {errors.pago?.type === "pattern" && 
              <p>Número no válido</p>}

              <div className='divBoton'>
                <button className='botonProducto'>Comprar</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </Inicio>
  )
}
