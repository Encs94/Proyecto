import React, {useContext, useEffect, useState} from 'react';
import '../App.css';
import Inicio from './Plantilla';
import Contexto from '../Contexto/Contexto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import sumar from '../assets/icons8-más-50.png';
import restar from '../assets/signo-menos.png';
import eliminar from '../assets/icons8-eliminar-48.png';

function Carrito() {

  const {pedido, logueado, setPedido, usuario} = useContext(Contexto);
  const [data, setData] = useState([]);
  const imagenes = require.context('./../assets', true);
  const navigate = useNavigate();
  const [precioT, setPrecioT] = useState();

  useEffect(() => {
    if(pedido.length >= 1){
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
        if(error.response.status === 404){
          console.log("No hay productos en el carrito")
        }
        Swal.fire({
          title: "Aún no ha añadido productos",
          icon: "error"
        })
      });
    }
    else{
      Swal.fire({
        title: "Aún no ha añadido productos",
        icon: "error"
      })
    }
    
  }, [pedido]);

  const comprar = () => {
    const pedidoString = JSON.stringify(data);
    if(logueado === true && data.length > 0) {
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
      Swal.fire({
        title: "Ups!",
        text: "Parece que el carrito esta vacio",
        icon: "error"
      })
    }
    console.log("pedidoString" + pedidoString)
  }


  const sumarCantidad = (id) => {
    var dataTemp = data;
    var precioTemp = 0;
    for(var i = 0;i < data.length ; i++){
      if(data[i].id === id){
        dataTemp[i].cantidad += 1;
        setData(dataTemp)
      }
    }
    // Refrecar precio
    for(var j = 0; j < dataTemp.length; j++){
      precioTemp += dataTemp[j].precio * dataTemp[j].cantidad
    }
    setPrecioT(precioTemp)
  }

  const restarCantidad = (id) => {
    var dataTemp = data;
    var precioTemp = 0;
    for(var i = 0; i < data.length ; i++){
      if(data[i].id === id && data[i].cantidad > 1){
        dataTemp[i].cantidad -= 1;
        setData(dataTemp)
      }
    }
    // Refrescar precio
    for(var j = 0; j < dataTemp.length; j++){
      precioTemp += dataTemp[j].precio * dataTemp[j].cantidad
    }
    setPrecioT(precioTemp);
  }

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
  
  return (
    <Inicio>
      <div className='containerCarroFondo'>
        <div className='containerTituloCarro'>
          <h1 className='tituloCarro'>Tu Carrito</h1>
        </div>

        <div className='contenedorCarro'>

          <div className="contenedorCajasCarro">
            {data.map((producto, i) => (
              producto.cantidad >= 1 &&
              <div key={i} className='containerProductos'>
                <span className='nombreProductoCarro'>{producto.nombre}</span>
                <img className='imagenProductoCarro' src={imagenes('./'+ producto.imagen +'.jpg')} alt={producto.nombre}/>
                <div className='infoProducto'>
                  <span className='precioProductoCarro'>{producto.precio}€</span>
                </div>
              </div>
            )) }
          </div>

          <div className='containerDetalles'>
            <div className="tituloDetalles">
                <h2>Productos</h2>
            </div>

            {data.map((producto, i) => (
              producto.cantidad >= 1 &&
              <div className='productoDetalles' key={i}>
                  <p className='tituloProductoCarro'>{producto.nombre}</p>
                  <button onClick={() => {restarCantidad(producto.id)}} className='botonRestar'><img className='imagenRestar' src={restar} alt="restar" /></button>
                  <p className="cantidad">{producto.cantidad}</p>
                  <button onClick={() => {sumarCantidad(producto.id)}} className='botonSumar'><img className='imagenSumar' src={sumar} alt="sumar" /></button>
                  <button className='botonEliminarCarro' onClick={() => borrarProd(producto.id)}><img className='imagenesIconos' alt='eliminar' src={eliminar}/></button>
              </div>
            ))}

            <div className='totalCarrito'>
              <div className='totalCarrito2'>
                <strong>Total</strong>
                <span>{precioT} €</span>
              </div>
              <button className='botonPagar' onClick={comprar}>Confirmar pedido</button>
            </div>
            
          </div>

        </div>

      </div>
    </Inicio>
  )
}

export default Carrito