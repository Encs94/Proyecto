import React from 'react';
import Header from './globales/Header';
import Footer from './globales/Footer';


const Inicio = ({children}) => {
  return (
    <>
      <header>
          <Header/>
      </header>
      <main>
          {children}
      </main>
      <footer>
          <Footer/>
      </footer>
    </>
  )
}

export default Inicio