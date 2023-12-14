<div className='containerTituloPedidos'>
        <h1>Tus Pedidos</h1>
      </div>
      <div className='containerPedidos'>
        <div className='containerPedidos2'>
          {dataPedidos !== undefined 
          ?
            // Pedido entero
            dataPedidos.objetopedidos.pedido.map((pedidoFull, i) => (
              <div className='pedidoEntero' key={i}>
                <h3 className='margenPedido numeroPedido'>Pedido {i + 1}</h3>
                <div className='pedidoEntero2'>
                  {/* Cada producto del pedido */}
                  {pedidoFull.map((producto, k) => (
                    <div key={k} className='productoPedido'>
                      <img className='imagenesPedidos' src={imagenes('./'+ producto.imagen +'.jpg')} alt={producto.nombre}/>
                      {/* <div className=''> */}
                        <div className='margenPedido nombreProductoPedido'>
                          <strong>Nombre: </strong>
                          <span className='marger5px'>{producto.nombre}</span>
                        </div>
                        <div className='margenPedido nombreProductoPedido'>
                          <strong>Precio:</strong>
                          <span className='marger5px'>{producto.precio}€</span>
                        </div>
                        <div className='margenPedido nombreProductoPedido'>
                          <strong>Cantidad:</strong>
                          <span className='marger5px'>{producto.cantidad}</span>
                        </div>

                      {/* </div> */}
                    </div>
                  )) }
                </div>

                <div>
                  <div>
                    <span>Total: </span>
                    <span></span>
                  </div>
                  <div>
                    <span>Fecha de creación:</span>
                    <span></span>
                  </div>
                </div>
              </div>
            ))
          :
            <h2>Aún no tiene pedidos</h2>

          }
        </div>
        <button onClick={()=>volver()}>Volver</button>
      </div>