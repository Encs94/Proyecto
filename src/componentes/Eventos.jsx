import React from 'react'
import Inicio from './Plantilla';
import './../App.css';
import japan from './../assets/japan.png';
import game from './../assets/logo-game-on.jpg';
import expo from './../assets/expoBarcelona.jpeg';

function Eventos() {

  const imagenes = require.context('./../assets', true);

  return (

    <Inicio>
      <div className='eventosGlobal'>
        <h1 className='tituloEventos'>Próximos eventos</h1>
        <div className='mainContainerEventos'>
          <div className='eventoContainer'>
            <div className='datosEventos'>
              <h3>Japan weekend Madrid</h3>
              <div>
                <ol>
                  <li type='circle'>Fecha: 04/02/2024</li>
                  <li type='circle'>Lugar: Ifema</li>
                  <li type='circle'>Precio entrada: 10€</li>
                  <li type='circle'>Más información <a className='enlaceEventos' href="https://www.japanweekend.com/madrid/">aquí</a></li>
                </ol>
              </div>
            </div>
            <div className='containerImagenEventos'>
              <img className='imagenEventos' src={japan} alt="IMAGEN" />
            </div>
          </div>

          <div className='eventoContainer'>
            <div className='datosEventos'>
              <h3>Expo Comic Barcelona</h3>
              <div>
                <ol>
                  <li type='circle'>Fecha: 17/05/2024</li>
                  <li type='circle'>Lugar: Barcelona</li>
                  <li type='circle'>Precio entrada: 12€</li>
                  <li type='circle'>Más información <a className='enlaceEventos' href="https://www.comic-barcelona.com/es/inicio.cfm">aquí</a></li>
                </ol>
              </div>
            </div>
            <div className='containerImagenEventos'>
              <img className='imagenEventos' src={expo} alt="IMAGEN" />
            </div>
          </div>

          <div className='eventoContainer'>
            <div className='datosEventos'>
              <h3>Game On</h3>
              <div>
                <ol>
                  <li type='circle'>Fecha: Sin confirmar</li>
                  <li type='circle'>Lugar: Madrid</li>
                  <li type='circle'>Precio entrada: 8€</li>
                  <li type='circle'>Más información <a className='enlaceEventos' href="https://www.ifema.es/madrid-games-week">aquí</a></li>
                </ol>
              </div>
            </div>
            <div className='containerImagenEventos'>
              <img className='imagenEventos' src={game} alt="IMAGEN" />
            </div>
          </div>

        </div>
      </div>
      
    </Inicio>
  )
}

export default Eventos