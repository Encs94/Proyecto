import React from 'react'
import { useContext, useState, useEffect } from 'react'
import Contexto from '../Contexto/Contexto'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Pedidos() {

  const {usuario} = useContext(Contexto);
  const imagenes = require.context('./../assets', true);
  const [dataPedidos, setDataPedidos] = useState()
  const navigate = useNavigate();
  let pedidos = [];


  useEffect(() => {
    axios.post(`http://localhost:8080/api/encontrarPed/${usuario.id}`)
      .then(response => {
        for(var i = 0; i < response.data.length; i++){
          pedidos.push(JSON.parse(response.data[i].pedido));
        }
        setDataPedidos(pedidos)
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, [usuario.id]);


  const volver = () => {
    navigate('/');
  }


  return (
    <div>
      {dataPedidos !== undefined 
      ?
        dataPedidos.map((pedidoFull, i) => (
          <div key={i}>
            <span>Pedido {i + 1}</span>
            {pedidoFull.map((producto, k) => (
              <div key={k} className=''>
              <img className='imagenProduc' src={imagenes('./'+ producto.imagen +'.jpg')} alt={producto.nombre}/>
              <div className='infoProducto'>
                <span className='nombreProducto'>{producto.nombre}</span>
                <div>
                  <span className='precioProducto'>{producto.precio}€</span>
                </div>
              </div>
            </div>
            )) }
          </div>
        ))
      :
        <h2>Aún no tiene pedidos</h2>

      }
      {console.log(dataPedidos)}
      <button onClick={()=>volver()}>Volver</button>
    </div>
  )
}

export default Pedidos