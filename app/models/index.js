const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Aqui digo que la base de datos usuario que he creado usa el modelo que hay en la carpeta usuario.model.js, para crear una nueva solo hay que poner otra linea igual
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.producto = require("./producto.model.js")(sequelize, Sequelize);
db.categoria = require("./categoria.model.js")(sequelize, Sequelize);
db.pedido = require("./pedido.model.js")(sequelize, Sequelize);
db.datosEnvio = require("./datosEnvio.model.js")(sequelize, Sequelize);

db.producto.belongsTo(db.categoria, {foreignKey: "idCategory"});

db.pedido.belongsTo(db.usuario, {foreignKey: "idUsuario"});

db.datosEnvio.belongsTo(db.usuario, {foreignKey: "idUsuario"});

module.exports = db; 