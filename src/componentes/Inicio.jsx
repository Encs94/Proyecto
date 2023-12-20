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
  // const [nombres, setNombres] = useState();
  const [mostrarOcultar, setMostrarOcultar] = useState("ocultarDiv");
  const [categorias, setCategorias] = useState("");
  const [letras, setLetras] = useState("");
  const navigate = useNavigate();
  var carro = [];
  

  // Traer los productos al iniciar la página
  useEffect(() => {
    // Realizar la petición GET cuando el componente se renderice
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
    const nuevaCategoria = e.target.value;

    // Si letras esta vacio y categoria es productos ("0") que saque todos los productos
    if(e.target.value === "0" && letras === ""){
      axios.get('http://localhost:8080/api/prods')
      .then(response => {
        setData(response.data);
        setMostrarOcultar("ocultarDiv");
        setCategorias(nuevaCategoria);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
    // Si letras NO esta vacio y categoria es productos ("0") que saque todos los productos con ese nombre
    if(e.target.value === "0" && letras !== ""){
      axios.post(`http://localhost:8080/api/prodLetra`,{
      letra: letras,
      idCategoria: ""
      })
      .then(response => {
        setData(response.data);
        setCategorias(nuevaCategoria);
        if(Object.keys(response.data).length === 0){
          setMostrarOcultar("mostrarDiv");
        }
        else{
          setMostrarOcultar("ocultarDiv");
        }
      })
      .catch(error => {
        console.log('Error al obtener los datos:');
      });
    }
    // Si hay alguna categoria y hay letras, que busque en esa categoria productos con ese nombre
    if(letras !== "" && e.target.value !== "0"){
      var category = e.target.value;
      axios.post(`http://localhost:8080/api/prodLetra`,{
      letra: letras,
      idCategoria: category
      })
      .then(response => {
        setData(response.data);
        setCategorias(nuevaCategoria);
        if(Object.keys(response.data).length === 0){
          setMostrarOcultar("mostrarDiv");
        }
        else{
          setMostrarOcultar("ocultarDiv");
        }
        
      })
      .catch(error => {
        console.log('Error al obtener los datos:');
      });
    }
    // Si no entra que me saque todos los productos de la categoria
    if(e.target.value !== "0" && letras === ""){
      axios.post(`http://localhost:8080/api/prodCategory/${nuevaCategoria}`)
      .then(response => {
        setData(response.data);
        setCategorias(nuevaCategoria);
        setMostrarOcultar("ocultarDiv");
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
      
    }
  }

  // Busqueda por letra o letra y categoria
  const busquedaletras = (e) => {
    const letra = e.target.value;
    setLetras(letra);
    // Si categorias esta activo y letra tambien
    if((categorias !== "" && categorias !== "0") && letra !== ""){
      axios.post(`http://localhost:8080/api/prodLetra`,{
      letra: letra,
      idCategoria: categorias
      })
      .then(response => {
        setData(response.data);

        if(Object.keys(response.data).length === 0){
          setMostrarOcultar("mostrarDiv");
        }
        else{
          setMostrarOcultar("ocultarDiv");
        }
        
      })
      .catch(error => {
        console.log('Error al obtener los datos:');
      });
    }
    // Si letra esta escrito y no he pulsado categorias o categorias es productos
    if((categorias === "0" || categorias === "") && letra !== ""){
      axios.post(`http://localhost:8080/api/prodLetra`,{
      letra: letra,
      idCategoria: ""
      })
      .then(response => {
        setData(response.data);
        if(Object.keys(response.data).length === 0){
          setMostrarOcultar("mostrarDiv");
        }
        else{
          setMostrarOcultar("ocultarDiv");
        }
      })
      .catch(error => {
        console.log('Error al obtener los datos:');
      });
    }
 
    // Si letra esta vacio pero categorias no (Para cuando el usuario este en una categoria pero borre todas las letras del buscador)
    if(letra === "" && (categorias !== "0" || categorias !== "")){
      axios.post(`http://localhost:8080/api/prodLetra`,{
      letra: "",
      idCategoria: categorias
      })
      .then(response => {
        setData(response.data);
        if(Object.keys(response.data).length === 0){
          setMostrarOcultar("mostrarDiv");
        }
        else{
          setMostrarOcultar("ocultarDiv");
        }
      })
      .catch(error => {
        console.log('Error al obtener los datos:');
      });
    }
    // Si no encuentra ninguna coincidencia y no ha elegido categorias, me saca todo los productos
    if(letra === "" && (categorias === "0" || categorias === "")){
      axios.get('http://localhost:8080/api/prods')
      .then(response => {
        setData(response.data);
        if(Object.keys(response.data).length === 0){
          setMostrarOcultar("mostrarDiv");
        }
        else{
          setMostrarOcultar("ocultarDiv");
        }
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
              <option className='option' value="0">Productos</option>
              <option className='option' value="1">Mangas</option>
              <option className='option' value="2">Comincs</option>
              <option className='option' value="3">Figuras</option>
              <option className='option' value="4">Juegos</option>
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