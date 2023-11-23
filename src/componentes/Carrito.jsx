import React, {useContext, useEffect, useState} from 'react';
import '../App.css';
import Inicio from './Plantilla';
import Contexto from '../Contexto/Contexto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'

function Carrito() {

  const {pedido, logueado, setPedido, usuario} = useContext(Contexto);
  const [data, setData] = useState([]);
  const imagenes = require.context('./../assets', true);
  const navigate = useNavigate();
  const [precioT, setPrecioT] = useState();


  const borrarProd = (id) => {
    if(pedido.length > 1){
      let tempPedido = [...pedido];
      let coincidencia = tempPedido.indexOf(id);
      if(coincidencia !== -1){
        tempPedido.splice( coincidencia, 1);
      }
      setPedido(tempPedido);
    }
  } 


  useEffect(() => {
    axios.post(`http://localhost:8080/api/prodId`, pedido)
      .then(response => {
        setData(response.data);
        // sacar precio primera vez
        var temp = 0;
        for(var i = 0;i < response.data.length; i++){
          temp += response.data[i].precio;
          
        }
        setPrecioT(temp)
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, [pedido]);


  const comprar = () => {
    const pedidoString = JSON.stringify(data);
    if(logueado === true) {
      axios.post(`http://localhost:8080/api/pedido`, {
        pedido: pedidoString,
        idUsuario: usuario.id
      })
      .then(response => {
        if (response.status === 200) {
          console.log("ok");
          navigate('/datosEnvio');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
    else {
      navigate('/login')
    }
    console.log("pedidoString" + pedidoString)
  }


  const cantidades = (id, cantidad) => {
    var dataTemp = data;
    var precioTemp = 0;
    for(var i = 0;i < data.length ; i++){
      if(data[i].id === id){
        dataTemp[i].cantidad = cantidad;
        setData(dataTemp)
      }
    }
    // Refrecar precio
    for(var j = 0; j < dataTemp.length; j++){
      precioTemp += dataTemp[j].precio * dataTemp[j].cantidad
    }
    setPrecioT(precioTemp)
  }

  
  return (
    <Inicio>
      <div className='containerCarro'>

        <div className="cajasCarro">
          <h2>Pedido</h2>
          {data.map((producto, i) => (

            <div key={i} className=''>
              <img className='imagenProduc' src={imagenes('./'+ producto.imagen +'.jpg')} alt={producto.nombre}/>
              <div className='infoProducto'>
                <span className='nombreProducto'>{producto.nombre}</span>
                <div>
                  <span className='precioProducto'>{producto.precio}€</span>
                  <span>Cantidad</span>
                  <select onChange={(e) => cantidades(producto.id, e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
              <button onClick={() => borrarProd(producto.id)}>Eliminar</button>
            </div>

          )) }
        </div>

        <div className='detallesCompra'>
          <span className='letra'>Productos {pedido.length}</span>
          <span  className='letra'>Total: {precioT}€</span>
          <button onClick={comprar}>Confirmar pedido</button>
        </div>
        
      </div>
    </Inicio>
  )
}

export default Carrito