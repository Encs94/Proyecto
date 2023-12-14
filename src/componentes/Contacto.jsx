import React from 'react';
import Inicio from './Plantilla';

function Contacto() {
  return (
    <Inicio>
      <div className='colorContacto'>
        <h1 className='tituloContacto'>Contacto</h1>
        <div className='containerPrincipalContacto'>
          <div className='containerContacto'>
            <div className='datosContacto'>
              <h3>Información</h3>
              <span className='interlineado2 datoSolo'>¡Bienvenido a nuestro espacio de contacto! En Freak Games, valoramos la conexión directa con nuestros clientes y colaboradores. Nos encantaría escucharte, responder tus preguntas y recibir tus comentarios. No dudes en ponerte en contacto con nosotros a través de los siguientes medios o visitandonos en la tienda física: </span>

              <span className='interlineado3 datoSolo'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6127" className="bi bi-telephone-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg><strong>Teléfono</strong>: 627 324 387</span>

              <span className='interlineado3 datoSolo'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6127" className="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg><strong>Dirección</strong>: Calle del Chorrón nº38</span>

              <span className='interlineado3 datoSolo'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6127" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
              <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
              <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z"/>
            </svg><strong>Correo</strong>: freakGames@gmail.com</span>
            </div>

            <div className='containerMapa'>
              <div className='mapaContacto'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.006119233255!2d-3.162890839322674!3d40.62974701921313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43ab751698cbf9%3A0x5ff2bf9b4f51b6b3!2sC.%20del%20Chorr%C3%B3n%2C%2038%2C%2019005%20Guadalajara!5e0!3m2!1ses!2ses!4v1702051406570!5m2!1ses!2ses" width="350" height="450"loading="lazy"></iframe>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Inicio>
  )
}

export default Contacto