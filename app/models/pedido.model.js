module.exports = (sequelize, Sequelize) => {
  const Pedido = sequelize.define("pedidos", {
    pedido: {
      type: Sequelize.TEXT
    },
    idUsuario: {
      type: Sequelize.INTEGER
    },
  });

  return Pedido;
};