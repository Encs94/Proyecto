const db = require("../models");

const Producto = db.producto;
const Op = db.Sequelize.Op;


// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.producto) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Acordarse cambiar los valores del producto para el producto
  const newProduct = {
    nombre: req.body.nombre,
    imagen: req.body.imagen,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    idCategory: req.body.idCategory,
    cantidad: req.body.cantidad,
    id: req.body.id
  };

  // Save producto in the database
  Producto.create(newProduct)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};


exports.findAll = (req, res) => {

  Producto.findAll()
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


exports.findOne = (req, res) => {
  const id = req.params.id;

  Producto.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Producto with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Encontrar por categoria

exports.findByCategory = async (req, res) => {
  const categoria = req.params.categoria;

  try {
    const producto = await Producto.findAll({
      where: {
        idCategory: categoria
      }
    });

    if (producto.length > 0) {
      res.send(producto);
    } else {
      res.status(404).send({
        message: `No producto found with categoria=${categoria}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving products with categoria=" + categoria
    });
  }
};

// Buscar por letra

exports.findByLetra = async (req, res) => {
  // Se usa params cuando se manda un dato por url, como en esta
  const letra = req.params.letra;

  try {
    const producto = await Producto.findAll({
      where: {
        nombre: {
          [Op.like]: `${letra}%`
        }
      }
    });

    if (producto.length > 0) {
      res.send(producto);
    } else {
      res.status(404).send({
        message: `No producto found with letra=${letra}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving products with letra=" + letra
    });
  }
};

// Traer productos con cierto id, para el carrito

exports.findById = async (req, res) => {
  // Se usa body en las que se manda los datos en el cuerpo, como un objeto o array
  console.log(req.body);
  const id = req.body;

  try {
    const producto = await Producto.findAll({
      where: {
        id: { [Op.in]: id }
      }
    });

    if (producto.length > 0) {
      res.send(producto);
    } else {
      res.status(404).send({
        message: `No producto found with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving products with id=" + id
    });
  }
};


exports.update = (req, res) => {
  const id = req.params.id;

  Producto.update(req.body, {
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


exports.delete = (req, res) => {
  const id = req.params.id;

  Producto.destroy({
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


exports.deleteAll = (req, res) => {
  Producto.destroy({
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


exports.findAllPublished = (req, res) => {
  Producto.findAll({ where: { published: true } })
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
