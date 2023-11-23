import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import Contexto from '../../Contexto/Contexto';

function Header() {

  const {usuario, logueado} = useContext(Contexto);

  return (

    <div className='header'>
      <span className='logo'>Logo</span>
      <div className='logNav'>
        <div className='navegacion'>
          <NavLink to='/' className='nav'>Inicio</NavLink>
          <NavLink to='/eventos' className='nav'>Eventos</NavLink>
          <NavLink className='nav'>Figuras</NavLink>
          <NavLink className='nav'>Accesorios</NavLink>
          <NavLink className='nav'>Contacto</NavLink>
        </div>
      </div>
      {
        logueado === false 
        ? <div>
            <NavLink className='botonIniciarSesion' to='/login'>Iniciar Sesion</NavLink>
          </div>
        : <div >
            <span className='botonIniciarSesion'>{usuario.nombre}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
            </span>
            <NavLink to='/pedidos'>Pedidos</NavLink>
          </div>
      }


    </div>
  )
}

export default Header