const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cervezasController = require("./controllers/cervezas.controller");
const usuariosController = require("./controllers/usuarios.controller");

const { check } = require("express-validator");

const server = express();

//server.use(express.static('static'));

//MIDDLEWARE ZONE
server.use(helmet());
server.use(bodyParser.json());

/***************************************************************************************************************/
/***************************************************************************************************************/
//**************************************GESTIÓN DE PETICIONES SOBRE USUARIOS ***********************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
//LISTAR TODOS LOS USUARIOS
server.get("/usuarios", usuariosController.listUsers);

//LISTAR UN USUARIO POR ID
server.get("/usuarios/:id", usuariosController.getOneUser);

//INSERTAR UN USUARIO EN LA TABLA USUARIOS
server.post(
  "/postUsuario",
  [
    check("nombre")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("apellidos")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("nickName")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("password")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("email")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty()
      .isEmail(),
    check("telefono")
      .isNumeric()
      .isLength({ min: 0, max: 9 })
      .not()
      .isEmpty()
  ],
  usuariosController.insertOneUser
);

//ACTUALIZAR REGISTRO DE UN USUARIO
server.put(
  "/putUsuario",
  [
    check("id")
      .isNumeric()
      .trim()
      .not()
      .isEmpty(),
    check("nombre")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("apellidos")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("nickName")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("password")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("email")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty()
      .isEmail(),
    check("telefono")
      .isNumeric()
      .isLength({ min: 0, max: 9 })
      .not()
      .isEmpty()
  ],
  usuariosController.updateOneUser
);

server.delete("/deleteUsuario/:id", usuariosController.deleteOneUser);

/***************************************************************************************************************/
/***************************************************************************************************************/
//**************************************GESTIÓN DE PETICIONES SOBRE CERVEZAS ***********************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
//LISTAR TODAS LAS CERVEZAS
server.get("/cervezas", cervezasController.listBeers);
//LISTAR UNA CERVEZA EN CONCRETO POR ID
server.get("/cervezas/:id", cervezasController.takeOneBeer);
//AÑADIR UNA CERVEZA AL LISTADO
server.post(
  "/postCerveza",
  [
    check("nombre")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("fabricante")
      .isAlpha()
      .escape()
      .not()
      .isEmpty(),
    check("fechaTaste")
      .escape()
      .trim()
      .matches(/^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/)
      .not()
      .isEmpty(),
    check("lugar")
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("precio")
      .isDecimal()
      .not()
      .isEmpty(),
    check("nota")
      .isDecimal()
      .isLength({ min: 0, max: 10 })
      .not()
      .isEmpty()
  ],
  cervezasController.insertOneBeer
);
//MODIFICAR UN REGISTRO DE LA TABLA SEGÚN ID
server.put(
  "/putCerveza",
  [
    check("id")
      .isNumeric()
      .escape()
      .not()
      .isEmpty(),
    check("nombre")
      .isAlpha()
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("fabricante")
      .isAlpha()
      .escape()
      .not()
      .isEmpty(),
    check("fechaTaste")
      .escape()
      .trim()
      .matches(/^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/)
      .not()
      .isEmpty(),
    check("lugar")
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("precio")
      .isDecimal()
      .trim()
      .not()
      .isEmpty(),
    check("nota")
      .isDecimal()
      .isLength({ min: 0, max: 10 })
      .trim()
      .not()
      .isEmpty()
  ],
  cervezasController.updateOneBeer
);

//ELIMINAR UNA CERVEZA DE LA TABLA SEGÚN ID
server.delete("/deleteCerveza/:id", cervezasController.deleteOneBeer);

server.listen(3000, () => {
  console.log("Servidor listo en el puerto 3000");
});
