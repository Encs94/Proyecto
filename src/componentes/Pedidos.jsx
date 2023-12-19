import React from 'react';
import { useContext, useState, useEffect } from 'react';
import Contexto from '../Contexto/Contexto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import Inicio from './Plantilla';
import travolta from '../assets/travoltaPedidos.gif';

function Pedidos() {

  const {usuario} = useContext(Contexto);
  const imagenes = require.context('./../assets', true);
  const [dataPedidos, setDataPedidos] = useState([]);
  const navigate = useNavigate();
  const [precioTotal, setPrecioTotal] = useState();
  var pedidos = [];
  var precio = [];
  var objetopedidos = {pedido: "", fecha: ""};

  useEffect(() => {

    // Return para manejar error en caso que usuario no este seteado aún
    if(usuario.id === ""){
      return
    }

    try{
      axios.post(`http://localhost:8080/api/encontrarPed/${usuario.id}`)
      .then(response => {
        for(var i = 0; i < response.data.length; i++){
          // Formatear la fecha
          var fechaCompleta = new Date(response.data[i].createdAt);
          var dia = fechaCompleta.getDate();
          var mes = fechaCompleta.getMonth() + 1;
          var año = fechaCompleta.getFullYear();
          var fechaFormateada = `${dia}-${mes}-${año}`
          // Meto los pedidos y la fecha de cada uno en un objeto y cada objeto en un array
          objetopedidos = {pedido: JSON.parse(response.data[i].pedido), fecha: fechaFormateada};
          pedidos.push(objetopedidos);
        }
        setDataPedidos(pedidos);

        // Sacar precio total de cada pedido
        // Parseo el objeto
        var pedidoTotal = [];
        for(var i = 0; i < response.data.length; i++){
          pedidoTotal.push(JSON.parse(response.data[i].pedido))
        }
        // Meto cada objeto en un array
        var pedidoUnico = [];
        for(var i = 0; i < pedidoTotal.length; i++) {
          pedidoUnico.push(pedidoTotal[i]);
        }
        // Recorro cada pedido para sacar el precio total de este
        for(var i = 0; i < pedidoUnico.length; i++){
          var precioPedido = 0;
          for(var j = 0; j < pedidoUnico[i].length; j++){
            precioPedido += pedidoUnico[i][j].cantidad * pedidoUnico[i][j].precio;
          }
          precio.push(precioPedido);
        }
        setPrecioTotal(precio);
        // Fin sacar precio total de cada pedido
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.log("El error: " + error.message);
        }
      });
    }
    catch{
      console.log("Fallo")
    }
  }, [usuario.id]);


  const volver = () => {
    navigate('/');
  }


  return (
    <Inicio>
      <div className='containerColor'>
        <div className='containerTituloPedidos'>
          <h1>Tus Pedidos</h1>
        </div>
        <div className='containerPedidos'>
          <div className='containerPedidos2'>
            {dataPedidos.length !== 0
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
                      </div>
                    )) }
                    {/* Fin de cada producto */}
                  </div>
                  
                  {/* Información sobre el pedido */}
                  <div className='precioFecha'>
                    <div className='precioPedidos'>
                      <span><b>Total:</b> </span>
                      <span>{precioTotal[i]} €</span>
                    </div>
                    <div className='fechaPedidos'>
                      <span><b>Fecha de creación:</b></span>
                      <span>{pedidoFull.fecha}</span>
                    </div>
                  </div>
                </div>
              ))
            :
            <div className='sinPedidos'>
              <img className='travolta' src={travolta}></img>
            </div>
            }
          </div>
          <button className='margenAbajo botonProducto' onClick={()=>volver()}>Volver</button>
        </div>
      </div>
    </Inicio>
  )
}

export default Pedidos