const db = require("../models");

const Pedido = db.pedido;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.pedido) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newPedido = {
    pedido: req.body.pedido,
    idUsuario: req.body.idUsuario
  }

  // Crear pedido
  Pedido.create(newPedido)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pedido."
      });
    });
};

// Encontrar pedidos por el id del usuario
exports.findByIdUsuario = async (req, res) => {
  const idUser = req.params.idUser;

  try {
    const pedido = await Pedido.findAll({
      where: {
        idUsuario: idUser
      }
    });

    if (pedido.length > 0) {
      res.send(pedido);
    } else {
      res.status(404).send({
        message: `No pedido found with idUser=${idUser}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving pedidos with idUser=" + idUser
    });
  }
};


// Eliminar pedido
exports.delete = (req, res) => {
  const id = req.params.id;

  Pedido.destroy({
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