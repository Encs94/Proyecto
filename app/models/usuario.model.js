// Esta es la estructura de la tabla, aqui le puedo añadir nuevos campos a la tabla
// Aqui le puedo añadir mas parametros como el type
// En .define() usuario es el nombre que tendra la tabla de la base de datos
module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuarios", {
    usuario: {
      type: Sequelize.STRING,
      unique: true
    },
    contraseña: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.TEXT
    }
  });

  return Usuario;
};