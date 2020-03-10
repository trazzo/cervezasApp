const connection = require("./db.model");

exports.getAllBeers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const beers = await connection.query(`SELECT * FROM cervezas`);
      resolve(beers);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getBeerById = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const beer = await connection.query(
        `SELECT * FROM cervezas WHERE id = ${id}`
      );
      resolve(beer);
    } catch (error) {
      reject(error);
    }
  });
};

exports.insertBeer = (name, producer, date, place, prize, calification) => {
  return new Promise(async (resolve, reject) => {
    try {
      const insertResult = await connection.query(
        `INSERT INTO cervezas (nombre, fabricante, fechaTaste, lugar, precio, nota) VALUES ("${name}","${producer}","${date}","${place}",${prize},${calification})`
      );
      resolve(insertResult);
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateBeer = (
  id,
  newName,
  newProducer,
  newDate,
  newPlace,
  newPrize,
  newCalification
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = ` UPDATE cervezas 
                    SET nombre = "${newName}",
                      fabricante = "${newProducer}", 
                      fechaTaste = "${newDate}", 
                      lugar = "${newPlace}", 
                      precio = ${newPrize}, 
                      nota = ${newCalification} 
                    WHERE id = ${id}`;
      const updateResult = await connection.query(sql);
      resolve(updateResult);
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteBeer = id => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      const deletedBeer = await connection.query(
        `DELETE FROM cervezas WHERE id = ${id}`
      );
      console.log(deletedBeer);
      resolve(deletedBeer);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
