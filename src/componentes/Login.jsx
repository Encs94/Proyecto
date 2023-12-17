import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Contexto from '../Contexto/Contexto';
import Swal from 'sweetalert2';

function Login() {


  const {usuario, contraseña, user, pass, setLogueado, setUsuario} = useContext(Contexto);
  const navigate = useNavigate();
  const [palabra, setPalabra] = useState("Usuario");

  // FUNCION PARA HASHEAR
  const hashToken = (token) => {
    
    const CryptoJS = require('crypto-js');
    const key = "claveRandom";
    const cifrado = CryptoJS.AES.encrypt(token, key).toString();
  
    console.log('Cifrado:', cifrado);

    return cifrado;
  }


  // COMPROBAR que el USUARIO y CONTRASEÑA son CORRECTOS
  const comprobar = () => {
    var pasar = false;
    // Traigo los usuarios
    axios.get('http://localhost:8080/api/usuarios')
      .then(response => {
        // Comprobacion
        for(var i = 0; i < response.data.length; i++){
          if(usuario.nombre === response.data[i].usuario && contraseña === response.data[i].contraseña){
            
            pasar = true;
            console.log(pasar);
            const newUser = {
              nombre: response.data[i].usuario,
              id: response.data[i].id
            }
            
            // Creo la cookie con la que voy a mantener la sesión iniciada (durante 1 hora)
            const fechaExpiracion = new Date(); // Creo fecha en la que estamos
            fechaExpiracion.setTime(fechaExpiracion.getTime() + 60 * 60 * 1000); // Le sumo una hora a la hora actual
            document.cookie = `User=${response.data[i].token}; expires=${fechaExpiracion.toUTCString()}`;

            setLogueado(true);
            setUsuario(newUser);
            break;
          }
        }
      })
      .then(() => {
        if(pasar === true){
          navigate('/');
        }
        else{
          Swal.fire({
            title: "Usuario o Contraseña incorrecta",
            icon: "error",
          })
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
    
    
  }


  // Peticion POST para AGREGAR NUEVO USUARIO
  const agregar = () => {
    var expresionContraseña = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(.{6,})$/;
    var pasar2 = true;
    const hash = hashToken(usuario.nombre);
    // Traigo los usuarios
    axios.get('http://localhost:8080/api/usuarios')
      .then(response => {
        // Comprobar si el nombre de usuario es unico
        for(var i = 0; i < response.data.length; i++){
          if(response.data[i].usuario === usuario.nombre){
            pasar2 = false;
            Swal.fire({
              title: "Usuario extistente, pruebe con otro",
              icon: "error"
            });
            break;
          }
        }
      })
      .then(() => {
        // Usurio no esta registrado y PASA
        if(pasar2 === true){
          if(expresionContraseña.test(contraseña)){
            axios.post('http://localhost:8080/api', {
              usuario: usuario.nombre,
              contraseña: contraseña,
              token: hash
            })
            .then(response => {
              // Si la respuesta es 200 seteo el usuario y estar logueado a true
              if (response.status === 200) {
                setLogueado(true);
                setUsuario({
                  nombre: usuario.nombre,
                  id: response.data.id
                })

                // Creo la cookie con la que voy a mantener la sesión iniciada (durante 1 hora)
                const fechaExpiracion = new Date(); // Creo fecha en la que estamos
                fechaExpiracion.setTime(fechaExpiracion.getTime() + 60 * 60 * 1000); // Le sumo una hora a la hora actual
                document.cookie = `User=${hash}; expires=${fechaExpiracion.toUTCString()}`;

                Swal.fire('Usuario Añadido!');
                navigate('/');
              }
            })
          }
          else {
            Swal.fire({
              title: "La contraseña debe tener 6 caracteres mínimo, una mayúscula y un caracter especial",
              icon: "error"
            })
          }
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
    
  }

  return (
    <div className='imagen'>
      <div className='contenedorLogin'>
        <div className='login'>
          <span className='spanLogin'>{palabra}</span>
          <input 
            onFocus={() => setPalabra("Usuario")} 
            onChange={(e) => user(e.target.value)} 
            className='botonesLogin usuario'
            required
          />
          <input 
            type='password' 
            onFocus={() => setPalabra("Contraseña")} 
            onChange={(e) => pass(e.target.value)} 
            className='botonesLogin usuario' 
            required
          />
          <button onClick={comprobar} className='botonesLogin entrarLogin'>Entrar</button>
          <button onClick={agregar}>Agregar Usuario</button>
        </div>
      </div>
    </div>
  )
}

export default Login