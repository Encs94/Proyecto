import React from 'react';
import { useContext, useState, useEffect } from 'react';
import Contexto from '../Contexto/Contexto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Inicio from './Plantilla';

function Pedidos() {

  const {usuario} = useContext(Contexto);
  const imagenes = require.context('./../assets', true);
  const [dataPedidos, setDataPedidos] = useState();
  const navigate = useNavigate();
  const [precioTotal, setPrecioTotal] = useState();
  var pedidos = [];
  var precio = 0;
  var objetopedidos = {pedido: "", fecha: ""};


  useEffect(() => {
    
    axios.post(`http://localhost:8080/api/encontrarPed/${usuario.id}`)
      .then(response => {
        for(var i = 0; i < response.data.length; i++){
          // Formatear la fecha
          var fechaCompleta = new Date(response.data[i].createdAt);
          var dia = fechaCompleta.getDate();
          var mes = fechaCompleta.getMonth() + 1;
          var año = fechaCompleta.getFullYear();
          var fechaFormateada = `${dia}-${mes}-${año}`
          // Termino formateo fecha

          objetopedidos = {pedido: JSON.parse(response.data[i].pedido), fecha: fechaFormateada}
          pedidos.push(objetopedidos);
        }
        setDataPedidos(pedidos);
        for(var i = 0; i < response.data.length; i++){
          console.log(response.data[i].pedido);
          // for(var j = 0; j < response.data[i].pedido.length; j++){
          //   console.log(response.data[i].pedido)
            // console.log(response.data[i].pedido[j].cantidad * response.data[i].pedido[j].precio)
            // precio += response.data[i].pedido[j].cantidad * response.data[i].pedido[j].precio;
            // console.log(precio)
            // console.log(response.data[i].pedido[j].cantidad)
          // }
        }
        // console.log(precio);
        setPrecioTotal(precio);
        

      })
      // .then(() => {
        
      // })
      .catch(error => {
        Swal.fire({
          title: "Aún no tiene pedidos realizados"
        })
      });
  }, [usuario.id]);


  const volver = () => {
    navigate('/');
  }


  return (
    <Inicio>
      <div className='containerTituloPedidos'>
        <h1>Tus Pedidos</h1>
      </div>
      <div className='containerPedidos'>
        <div className='containerPedidos2'>
          {dataPedidos !== undefined 
          ?
            // Pedido entero
            dataPedidos.map((pedidoFull, i) => (
              <div className='pedidoEntero' key={i}>
                <h3 className='margenPedido numeroPedido'>Pedido {i + 1}</h3>
                <div className='pedidoEntero2'>
                  {/* Cada producto del pedido */}
                  {pedidoFull.pedido.map((producto, k) => (
                    <div key={k} className='productoPedido'>
                      <img className='imagenesPedidos' src={imagenes('./'+ producto.imagen +'.jpg')} alt={producto.nombre}/>
                      {/* <div className=''> */}
                        <div className='margenPedido nombreProductoPedido'>
                          <strong>Nombre: </strong>
                          <span className='marger5px'>{producto.nombre}</span>
                        </div>
                        <div className='margenPedido nombreProductoPedido'>
                          <strong>Precio:</strong>
                          <span className='marger5px'>{producto.precio}€</span>
                        </div>
                        <div className='margenPedido nombreProductoPedido'>
                          <strong>Cantidad:</strong>
                          <span className='marger5px'>{producto.cantidad}</span>
                        </div>

                      {/* </div> */}
                    </div>
                  )) }
                </div>

                <div className='precioFecha'>
                  <div className='precioPedidos'>
                    <span>Total: </span>
                    <span>{precioTotal}</span>
                  </div>
                  <div className='fechaPedidos'>
                    <span>Fecha de creación:</span>
                    <span>{pedidoFull.fecha}</span>
                  </div>
                </div>
              </div>
            ))
          :
            <h2>Aún no tiene pedidos</h2>

          }
        </div>
        <button onClick={()=>volver()}>Volver</button>
      </div>
    </Inicio>
  )
}

export default Pedidos