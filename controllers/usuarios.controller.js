const usuariosModel = require("../models/usuarios.model");
const { validationResult } = require("express-validator");

exports.listUsers = async (req, res) => {
  try {
    res.send(await usuariosModel.getAllUsers());
  } catch (error) {
    res.send(error);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    res.send(await usuariosModel.getUserById(req.params.id));
  } catch (error) {
    res.send(error);
  }
};

exports.insertOneUser = async (req, res) => {
  const errors = validationResult(req);
  if (errors) {
    try {
      const name = req.body.nombre;
      const surName = req.body.apellidos;
      const nickName = req.body.nickName;
      const password = req.body.password;
      const email = req.body.email;
      const phone = req.body.telefono;

      const insertResult = await usuariosModel.insertUser(
        name,
        surName,
        nickName,
        password,
        email,
        phone
      );
      console.log(insertResult); //está hecho simplemente por ver bien qué responde usuarios.Model.insertUser() en el modelo
      res.send({
        message: `user: ${nickName} inserted with the id: ${insertResult.insertId}`
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

exports.updateOneUser = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors | JSON); //solo para ver el valor de errors
  if (errors) {
    try {
      const id = req.body.id;
      const name = req.body.nombre;
      const surName = req.body.apellidos;
      const nickName = req.body.nickName;
      const password = req.body.password;
      const email = req.body.email;
      const phone = req.body.telefono;

      const updateResult = await usuariosModel.updateUserById(
        id,
        name,
        surName,
        nickName,
        password,
        email,
        phone
      );
      console.log(updateResult);
      res.send({
        message: `user: ${nickName} with id: ${id} updated successfully!!`
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res
      .status(400)
      .send({ message: "Update incompleted, user id is not correct" });
  }
};

exports.deleteOneUser = async (req, res) => {
  try {
    const deletedUser = await usuariosModel.deleteUser(req.params.id);
    if (deletedUser.affectedRows > 0) {
      res.send({ message: `USER ${req.params.id} DELETED SUCCESSFULLY!!!` });
    } else {
      res
        .status(404)
        .send({ error: `THE ID ${req.params.id} DOES NOT EXISTS` });
    }
  } catch (error) {
    res.send(error);
  }
};
