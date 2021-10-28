const express = require("express");
const router = express.Router();

router.post("/crear", (req, res) => {
  req.app.locals.db
    .collection("clientes")
    .find({ dni: req.body.dni })
    .toArray(function (err, datos) {
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "Consulta fallida a la BBDD.",
        });
      } else {
        if (datos.length > 0) {
          res.send({
            error: true,
            data: datos,
            mensaje: "El usuario ya existe",
          });
        } else {
          req.app.locals.db
            .collection("clientes")
            .insertOne(req.body, function (err1, datos1) {
              err1
                ? res.send({ error: true, data: datos1, mensaje: err1 })
                : res.send({
                    error: false,
                    data: datos1,
                    mensaje: "Cliente creado correctamente",
                  });
            });
        }
      }
    });
});

router.put("/modificar", (req, res) => {
  req.app.locals.db
    .collection("clientes")
    .updateOne({ dni: req.body.dni }, { $set: req.body }, (err, data) => {
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "Ha fallado la consulta",
        });
      } else {
        if (data.modifiedCount > 0) {
          res.send({
            error: false,
            data: data,
            mensaje: "Cliente actualizado correctamente",
          });
        } else {
          res.send({
            error: true,
            data: data,
            mensaje: "No se ha modificado el cliente",
          });
        }
      }
    });
});

module.exports = router;
