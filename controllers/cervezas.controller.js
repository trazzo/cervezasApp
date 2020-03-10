const cervezasModel = require("../models/cervezas.model");
const { validationResult } = require("express-validator");

exports.listBeers = async (req, res) => {
  try {
    const listBeers = await cervezasModel.getAllBeers();
    res.send(listBeers);
  } catch (error) {
    res.send(error);
  }
};

exports.takeOneBeer = async (req, res) => {
  try {
    const beerId = req.params.id;
    res.send(await cervezasModel.getBeerById(beerId));
  } catch (error) {
    res.send(error);
  }
};

exports.insertOneBeer = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const name = req.body.nombre;
    const producer = req.body.fabricante;
    const date = req.body.fechaTaste;
    const place = req.body.lugar;
    const prize = req.body.precio;
    const calification = req.body.nota;
    try {
      const insertResult = await cervezasModel.insertBeer(
        name,
        producer,
        date,
        place,
        prize,
        calification
      );
      res.send({
        message: `The beer ${name} was inserted successfully with the id ${insertResult.insertId}`
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(400).send({
      message: "Body is made in an incorrect way",
      explanation: errors
    });
  }
};

exports.updateOneBeer = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const id = req.body.id;
    const name = req.body.nombre;
    const producer = req.body.fabricante;
    const date = req.body.fechaTaste;
    const place = req.body.lugar;
    const prize = req.body.precio;
    const calification = req.body.nota;
    try {
      await cervezasModel.updateBeer(
        id,
        name,
        producer,
        date,
        place,
        prize,
        calification
      );
      res.send({
        message: `The beer ${name} was updated successfully with the newValues`
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(400).send({
      message: "Update incompleted, beer id is not correct"
    });
  }
};

exports.deleteOneBeer = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBeer = await cervezasModel.deleteBeer(id);
    if (deletedBeer.affectedRows > 0) {
      res.send({ message: `BEER ${id} DELETED SUCCESSFULLY!!!` });
    } else {
      res.status(404).send({ error: "ID NOT EXISTS" });
    }
  } catch (error) {
    res.send(error);
  }
};
