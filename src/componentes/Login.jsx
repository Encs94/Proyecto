import React from 'react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Contexto from '../Contexto/Contexto';
import Swal from 'sweetalert2';


function Login() {

  const [data, setData] = useState([]);
  const {usuario, contraseña, user, pass, setLogueado, setUsuario} = useContext(Contexto);
  const navigate = useNavigate();
  const [palabra, setPalabra] = useState("Usuario");


  useEffect( () => {
    axios.get('http://localhost:8080/api/usuarios')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  },[])


  // Aqui comprobar que el usuario y contraseña son correctos
  const comprobar = () => {
    var pasar = false;
    for(var i = 0; i < data.length; i++){
      if(usuario.nombre === data[i].usuario && contraseña === data[i].contraseña){
        setLogueado(true);
        pasar = true;
        const newUser = {
          nombre: data[i].usuario,
          id: data[i].id
        }
        setUsuario(newUser);
        console.log(data[i].id)
        break;
      }
    }
    if(pasar === true){
      navigate('/');
    }
    else{
      Swal.fire({
        title: "Usuario o Contraseña incorrecta",
        icon: "error",
      })
    }
  }


  // Peticion POST para agregar nuevo usuario
  const agregar = () => {
    axios.post('http://localhost:8080/api', {
      usuario: usuario.nombre,
      contraseña: contraseña
    })
    .then(response => {
      if (response.status === 200) {
        Swal.fire('Usuario Añadido!')
      }
    })
  }

  return (
    <div className='imagen'>
      <div className='contenedorLogin'>
        <div className='login'>
          <span className='spanLogin'>{palabra}</span>
          <input onFocus={() => setPalabra("Usuario")} onChange={(e) => user(e.target.value)} className='botonesLogin usuario'/>
          <input type='password' onFocus={() => setPalabra("Contraseña")} onChange={(e) => pass(e.target.value)} className='botonesLogin usuario'/>
          <button onClick={comprobar} className='botonesLogin entrarLogin'>Entrar</button>
          <button onClick={agregar}>Agregar Usuario</button>
        </div>
      </div>
    </div>
  )
}

export default Login