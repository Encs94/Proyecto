const db = require("../models");

const Datos = db.datosEnvio;
const Op = db.Sequelize.Op;


// Create and Save a new
exports.create = (req, res) => {

  if (!req.body.datos) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newDatos = {
    datos: req.body.datos,
    idUsuario: req.body.idUsuario,
  };

  // Save Usuario in the database
  Datos.create(newDatos)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};


// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Usuario.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Users."
      });
    });
};
