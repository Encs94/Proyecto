import React from 'react'
import Inicio from './Plantilla';
import './../App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Eventos() {

  const imagenes = require.context('./../assets', true);

  const NextArrow = (props) => (
    <div className="prev-arrow" onClick={props.onClick}>
      <span>&#8592;</span>
    </div>
  );
  
  const PrevArrow = (props) => (
    <div className="next-arrow" onClick={props.onClick}>
      <span>&#8594;</span>
    </div>
  );

  const settings = {
    // dots: true,
    rows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };


  return (
    <div>
      <Inicio>
        <h2 className='titulo'>Próximos eventos</h2>
        <div className='carruselContenedor'>
          <Slider {...settings}>
            <div>
              <img className='carousel-item' src={imagenes('./imagenLogin.jpg')} alt="Imagen 1" />
            </div>
            <div>
              <img className='carousel-item' src={imagenes('./japan.png')} alt="Imagen 2" />
            </div>
            <div>
              <img className='carousel-item' src={imagenes('./imagenLogin.jpg')} alt="Imagen 3" />
            </div>
          </Slider>
        </div>
      </Inicio>
    </div>
  )
}

export default Eventos