import React, {useState} from 'react'
import Contexto from './Contexto'

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
  const pass = (valor2) => {
    setContraseña(valor2);
  }
  return (
    <Contexto.Provider value={{pass, user, usuario, setUsuario, contraseña, logueado, setLogueado, pedido, setPedido}}>
      {children}
    </Contexto.Provider>
  )
}
