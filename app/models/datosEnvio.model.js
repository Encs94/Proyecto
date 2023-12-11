module.exports = (sequelize, Sequelize) => {
  const Envio = sequelize.define("datosEnvio", {
    datos: {
      type: Sequelize.TEXT
    },
    idUsuario: {
      type: Sequelize.INTEGER
    }
  });

  return Envio;
};