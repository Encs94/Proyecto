module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define("productos", {
    nombre: {
      type: Sequelize.STRING
    },
    imagen: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.INTEGER
    },
    cantidad: {
      type: Sequelize.INTEGER
    },
    idCategory: {
      type: Sequelize.INTEGER
    }
  });

  return Producto;
};