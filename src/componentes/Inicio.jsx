import React from 'react';
import Inicio from './Plantilla';
import './../App.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Contexto from '../Contexto/Contexto';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import figuras from './../assets/figuritas.jpg';
import han from './../assets/hanSolo.jpg';
import juegos from './../assets/juegosdemesa.png';
import mangas from './../assets/mangas.webp';
import logo from './../assets/Sin título-2.svg';
import comic from './../assets/comics.jpg';

export default function Tienda() {

  const imagenes = require.context('./../assets', true);
  const [data, setData] = useState([]);
  const {setPedido, logueado} = useContext(Contexto);
  const [nombres, setNombres] = useState();
  const [mostrarOcultar, setMostrarOcultar] = useState("ocultarDiv");
  const [categorias, setCategorias] = useState();
  const navigate = useNavigate();
  var carro = [];
  

  // Traer los productos 

  useEffect(() => {
    const nombres = new Set();
    // Realizar la petición GET cuando el componente se monte
    axios.get('http://localhost:8080/api/prods')
      .then(response => {
        setData(response.data);
        // Saco todas las letras distintas de los diferentes nombres
        for(var i = 0; i < response.data.length; i++){
          nombres.add(response.data[i].nombre.toLowerCase());
        }
        const arrayNombres = Array.from(nombres);
        setNombres(arrayNombres);
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
        setCategorias(undefined);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
    else{
      axios.post(`http://localhost:8080/api/prodCategory/${nuevaCategoria}`)
      .then(response => {
        setData(response.data);
        setCategorias(nuevaCategoria);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
      
    }
  }

  // Busqueda por letra

  const busquedaletras = (e) => {
    const letra = e.target.value;
    const letraMinus = letra.toLowerCase();
    var pasar = false;
    console.log(categorias)
    if(letra !== ""){
      for(var i = 0; i < nombres.length; i++){
        if(letraMinus === nombres[i].substring(0, letraMinus.length).toLowerCase()){
          pasar = true;
        }
      }
      if(pasar === true ){
        if(categorias !== undefined){
          axios.post(`http://localhost:8080/api/prodLetra`,{
          letra: letra,
          idCategoria: categorias
          })
          .then(response => {
            setData(response.data);
            setMostrarOcultar("ocultarDiv");
          })
          .catch(error => {
            console.log('Error al obtener los datos:');
          });
        }
        if(categorias === undefined){
          axios.post(`http://localhost:8080/api/prodLetra`,{
          letra: letra,
          idCategoria: ""
          })
          .then(response => {
            setData(response.data);
            setMostrarOcultar("ocultarDiv");
          })
          .catch(error => {
            console.log('Error al obtener los datos:');
          });
        }
        
      }
    }
    if(letra === "" || pasar === false){
      if(pasar === false && letra !== ""){
        setMostrarOcultar("mostrarDiv");
      }
      axios.get('http://localhost:8080/api/prods')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
  }

  // Agregar al carrito
  const agregarCarrito = (id) => {
    if(logueado === true){
      carro.push(id);
      Swal.fire({
        title: "Producto añadido",
        timer: 1000
      })
    }
    else {
      Swal.fire({
        title: "Debe registrarse primero",
        icon: "error"
      })

    }
  }

  // Ir al carrito
  const irAlCarro = () => {
    if(logueado === true){
      setPedido(carro);
      navigate('/carro');
    }
    else {
      Swal.fire({
        title: "Debe registrarse primero",
        icon: "error"
      })
    }
    
  }


  return (
    <Inicio>
      
      <div className="containerInicio">
        <div className='containerTituloInicio'>
          <h1 className='tituloh1'>Freak Games</h1>
          <img className='Logoh1' src={logo} alt="imgLogo" />
        </div>

        <div className='containerBaner'>
          <div className='baner'>
            <img className='imgBaner' src={mangas} alt="img1" />
            <img className='imgBaner' src={figuras} alt="img3" />
            <img className='imgBaner' src={han} alt="img2" />
            <img className='imgBaner' src={juegos} alt="img5" />
            <img className='imgBaner' src={comic} alt="img4" />
          </div>
        </div>
        
        <h2 className='titulosInicio'>Nuestros  Productos</h2>
        
        <div className='buscadores'>
        <div className={`avisoNoHayProductos ${mostrarOcultar}`}>
          <h2 className='h2NoProductos'>No disponemos de ese produto</h2>
        </div>
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
            <button className='botonProducto' onClick={irAlCarro}>Carrito</button>
          </div>
        </div>

        <div className="cajas">
          {data.map((producto, i) => (
            <div key={i} className='caja'>
              <img className='imagenProduc' src={imagenes('./'+ producto.imagen +'.jpg')} alt={producto.nombre}/>
              <div className='infoProducto'>
                <span className='nombreProducto'>{producto.nombre}</span>
                <span className='precioProducto'>{producto.precio}€</span>
                <button className='botonProducto' onClick={() => agregarCarrito(producto.id)}>Añadir al carro</button>
              </div>
            </div>      
          )) }
        </div>

      </div>
    </Inicio>
  )
}