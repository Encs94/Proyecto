const db = require("../models");
// Aqui le digo que usuario es igual a la tabla de usuario que hay en el model
const Usuario = db.usuario;
const Op = db.Sequelize.Op;


// Create and Save a new Usuario
exports.create = (req, res) => {
  console.log(req.body.token);
  // Validate request
  if (!req.body.usuario) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  
  // Esto son los campos que se van a crear en la base de datos (añadir un nuevo usuario)
  const newUser = {
    usuario: req.body.usuario,
    contraseña: req.body.contraseña,
    token: req.body.token
  };

  
  // Save Usuario in the database
  Usuario.create(newUser)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        console.error('Error: El usuario ya existe.');
      } else {
        throw error;
      }
    });
};

// Retrieve all Usuario from the database.
exports.findAll = (req, res) => {

  Usuario.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving usuario."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request


exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
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

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
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
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
