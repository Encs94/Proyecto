import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../App.css';
import Contexto from '../../Contexto/Contexto';
import logo from '../../assets/Logo.svg';

function Header() {

  const {usuario, logueado, setUsuario, setLogueado} = useContext(Contexto);
  const navigate = useNavigate()

  const cerrarSesion = () => {
    // Elimino la cookie
    const fechaActual = new Date();
    document.cookie = `User=; expires=${fechaActual.toUTCString()}`;
    setUsuario(null);
    setLogueado(false);
    navigate("/");
  }

  return (

    logueado === false 
    ? 
    // Sesion no iniciada
    <div className='header headerSinUsuario'>
      <span className='logo'><img src={logo} alt='logo'/></span>
      <div className='logNav'>
        <div className='navegacion'>
          <NavLink to='/' className='navHeader'>Inicio</NavLink>
          <NavLink to='/eventos' className='navHeader'>Eventos</NavLink>
          <NavLink to='/contacto' className='navHeader'>Contacto</NavLink>
        </div>
      </div>
      <div className='divInicioSesion'>
        <NavLink className='botonIniciarSesion' to='/login'>Iniciar Sesion</NavLink>
      </div>
    </div>
      
    // Sesion iniciada
    : 
    <div className='header'>
      {/* <div className='divSesionIniciada'> */}
        <div className='logoNav'>
          <span className='logo'><img src={logo} alt='logo'/></span>
          <div className='logNav'>
            <div className='navegacion'>
              <NavLink to='/' className='navHeader'>Inicio</NavLink>
              <NavLink to='/eventos' className='navHeader'>Eventos</NavLink>
              <NavLink to='/contacto' className='navHeader'>Contacto</NavLink>
            </div>
          </div>
        </div>

        <div className='margenDerecho8'>
          <span className='botonIniciarSesion'>{usuario.nombre}</span>
          <span className='iconoUsuario'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"        fill="orange" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg></span>
          <NavLink className='pedidosInicioSesion margenInicio' to='/pedidos'>Pedidos</NavLink>
          <button className='botonCerrarSesion' onClick={() => cerrarSesion()}>Cerrar Sesión</button>
        </div>
    </div>
  )
}

export default Header