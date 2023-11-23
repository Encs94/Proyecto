import React from 'react';
import Inicio from './Plantilla';
import './../App.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Contexto from '../Contexto/Contexto';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Tienda() {

  const imagenes = require.context('./../assets', true);
  const [data, setData] = useState([]);
  const {setPedido} = useContext(Contexto);
  const navigate = useNavigate();
  let carro = [];


  useEffect(() => {
    // Realizar la petición GET cuando el componente se monte
    axios.get('http://localhost:8080/api/prods')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);


  // Busqueda por categoria

  const filtrarCategorias = (e) => {
    const nuevaCategoria = e.target.value
    if(e.target.value === "0"){
      axios.get('http://localhost:8080/api/prods')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
    else{
      axios.post(`http://localhost:8080/api/prodCategory/${nuevaCategoria}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
  }


  // Busqueda por letra

  const busquedaletras = (e) => {
    const letra = e.target.value
    if(letra !== ""){
      axios.post(`http://localhost:8080/api/prodLetra/${letra}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
    else{
      axios.get('http://localhost:8080/api/prods')
      .then(response => {
        setData(response.data);
      })
      
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
  }

  const agregarCarrito = (id) => {
    carro.push(id);
    Swal.fire({
      title: "Producto añadido",
      timer: 1000
    })
  }


  const irAlCarro = () => {
    setPedido(carro);
    navigate('/carro');
  }


  return (
    <Inicio>
      
      <div className="container">
        <div className='buscadores'>
          <input onChange={busquedaletras} className='buscador' placeholder='    Buscar productos'/>
          <div>
            <select className='seleccion2 flecha' onChange={filtrarCategorias}>
              <option className='opcion' value="0"></option>
              <option className='opcion' value="1">Mangas</option>
              <option className='opcion' value="2">Comincs</option>
              <option className='opcion' value="3">Figuras</option>
              <option className='opcion' value="4">Juegos</option>
            </select>
          </div>
          <div>
            <button onClick={irAlCarro}>Carrito</button>
          </div>
        </div>

        <div className="cajas">
          {data.map((producto, i) => (
            <div key={i} className='caja'>
              <img className='imagenProduc' src={imagenes('./'+ producto.imagen +'.jpg')} alt={producto.nombre}/>
              <div className='infoProducto'>
                <span className='nombreProducto'>{producto.nombre}</span>
                <span className='precioProducto'>{producto.precio}€</span>
                <button onClick={() => agregarCarrito(producto.id)}>Añadir al carro</button>
              </div>
            </div>      
          )) }
        </div>
        {/* <button onClick={verCarro}>Ver</button> */}
      </div>
    </Inicio>
  )
}