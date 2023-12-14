import React, {useState, useEffect} from 'react';
import Contexto from './Contexto';
import axios from 'axios';

export default function Provider({children}) {
  const [usuario, setUsuario] = useState({
    nombre: "",
    id: ""
  });
  const [contraseña, setContraseña] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [pedido, setPedido] = useState([]);


  const user = (valor1) => {
    setUsuario({
      nombre: valor1,
      id: ""
    });
  }

  // DESHASHEAR
  const deshashToken = (hash) => {
    const CryptoJS = require('crypto-js');
  
    const key = 'claveRandom';
    const mensajeDescifrado = CryptoJS.AES.decrypt(hash, key).toString(CryptoJS.enc.Utf8);

    return mensajeDescifrado;
  }

  useEffect(()=>{
    var cookies = document.cookie;
    if(cookies.length >= 1){
      var cookieArray = cookies.split(';'); // Divide la cadena de cookies en un array
      for(var i = 0; i < cookies.length; i++){
        var cookie = cookieArray[i].trim();
        // Verifico si la cookie comienza con "User"
        if(cookie.startsWith("User=")){
          var valorCookie = cookie.substring("User=".length);
          const cookieDeshash = deshashToken(valorCookie);
          var user;
          var id;
          var log;
          // Si esta la cookie, compruebo que el token sea el de uno de los usuarios
          // y saco los datos de cual
          axios.get('http://localhost:8080/api/usuarios')
            .then(response => {
              for(var i = 0; i < response.data.length; i++){
                if(deshashToken(response.data[i].token) === cookieDeshash){
                  console.log("Dentro del if");
                  user = response.data[i].usuario;
                  id = response.data[i].id;
                  log = true;
                  setUsuario({nombre: response.data[i].usuario, id: response.data[i].id});
                  setLogueado(true)

                  break;
                }
              }
            })
            .then(() => {
              console.log(logueado)
            })
            .catch(error => {
              console.error('Error al obtener los datos:', error);
          });

          break;
        }
      }
    }
  },[])
  
  
  const pass = (valor2) => {
    setContraseña(valor2);
  }

  return (
    <Contexto.Provider value={{pass, user, usuario, setUsuario, contraseña, logueado, setLogueado, pedido, setPedido}}>
      {children}
    </Contexto.Provider>
  )
}
