const connection = require("./db.model");

exports.getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await connection.query(`SELECT * FROM usuarios`);
      resolve(users);
    } catch (errors) {
      reject(error);
    }
  });
};

exports.getUserById = id => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await connection.query(`SELECT * FROM usuarios WHERE id = ${id}`)
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.insertUser = (name, surName, nickName, password, email, phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await connection.query(
          `INSERT INTO usuarios (nombre, apellidos, nickName, password, email, telefono) VALUES ("${name}", "${surName}", "${nickName}", "${password}", "${email}", ${phone})`
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateUserById = (
  id,
  name,
  surName,
  nickName,
  password,
  email,
  phone
) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await connection.query(
          `UPDATE usuarios SET nombre = "${name}", apellidos = "${surName}", nickName = "${nickName}", password = "${password}", email = "${email}", telefono = ${phone} WHERE id = ${id}`
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteUser = id => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await connection.query(`DELETE FROM usuarios WHERE id = ${id}`));
    } catch (error) {
      reject(error);
    }
  });
};
