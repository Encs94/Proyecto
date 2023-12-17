import React from 'react';
import Inicio from './Plantilla';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Contexto from '../Contexto/Contexto';
import axios from 'axios';
import Swal from 'sweetalert2';

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
          Swal.fire({
            title: "Enhorabuena ! Su compra está en camino",
            icon: "success"
          })
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
              <p className='parrafosDatos'>Información de</p>
              <p className='parrafosDatos'>envio</p>
              <p className='parrafosDatos'>y</p>
              <p className='parrafosDatos'>pago</p>
              <h4 className='parrafo2Datos'>Solo a un paso de su compra </h4>
            </div>
          </div>

          <div className='contenedorForm'>
            <h2 className='tituloFormDatos'>Información</h2>
            <form className='formularioEnvio' onSubmit={handleSubmit(guardarDatos)}>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="nombre">Nombre</label>
                <input className='inputDatos' id='nombre' type="text" 
                {...register('nombre')} required />
              </div>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="apellidos">Apellidos</label>
                <input className='inputDatos' id='apellidos' type="text" 
                {...register('apellidos')} required />
              </div>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="direccion">Dirección</label>
                <input className='inputDatos' id='direccion' type="text" 
                {...register('direccion')} required />
              </div>

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="telefono">Teléfono</label>
                <input className='inputDatos' id='telefono' type="text" 
                {...register('telefono',
                {pattern:/^[69]\d{8}$/})} required />
              </div>
              {errors.telefono?.type === "pattern" && 
              alert("El teléfono debe emprezar por 6 o 9 y tener 9 dígitos")}

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="email">Email</label>
                <input className='inputDatos' id='email' type="text"
                {...register('email',
                  {pattern:/^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/}
                )} required />
              </div>
              {errors.email?.type === "pattern" && 
              alert("Email no válido")}

              <div className='apartadoForm'>
                <label className='labelDatos' htmlFor="pago">Añadir tarjeta</label>
                <input className='inputDatos' id='pago' type="text"
                {...register('pago',
                {pattern:/([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{2})\s*\t*(\d{10})/g}
                )} required />
              </div>
              {errors.pago?.type === "pattern" && 
              alert("IBAN incorrecto")}

              <div className='divBoton'>
                <button className='margenBotonEnvio botonProducto'>Comprar</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </Inicio>
  )
}
