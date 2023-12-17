module.exports = app => {
  // Aqui puedo definir otra variable con otro controlador para que acceda a los metodos con estas rutas

  const router = require("express").Router();

                      // USUARIOS

  const usuario = require("../controllers/usuarios.controller.js");

  router.post("/", usuario.create);
  router.get("/usuarios", usuario.findAll);
  router.get("/published", usuario.findAllPublished);


                      // PRODUCTOS

  const producto= require("../controllers/productos.controller.js");

  // Crear producto
  router.post("/prod", producto.create);
  // Traer todos los productos
  router.get("/prods", producto.findAll);
  // Retrieve all published producto
  router.get("/publishedProds", producto.findAllPublished);
  // Buscar por categoria
  router.post("/prodCategory/:categoria", producto.findByCategory);
  // Buscar por letra
  router.post("/prodLetra", producto.findByLetra);
  // Buscar por id
  router.post("/prodId", producto.findById);

                    // PEDIDOS

  const pedido = require("../controllers/pedidos.controller.js");

  // Añadir pedido
  router.post("/pedido", pedido.create);
  // Traer pedido con id
  router.post("/encontrarPed/:idUser", pedido.findByIdUsuario);
  // Borrar pedido con id
  router.delete("/borrarPed/:id", pedido.delete);



                    // DATOS ENVIO

  const datosPedido = require("../controllers/datosEnvio.controller.js")

  // Añadir
  router.post("/datosPedido", datosPedido.create);

  app.use('/api', router);

};