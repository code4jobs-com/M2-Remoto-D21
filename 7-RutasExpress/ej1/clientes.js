const express = require("express");
const router = express.Router();

router.post("/crear", (req, res) => {
  req.app.locals.db
    .collection("clientes")
    .find({ dni: req.body.dni })
    .toArray(function (err, datos) {
      if (err) {
        res.send({ error: true, data: datos, mensaje: err });
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
                    mensaje: "Respuesta OK",
                  });
            });
        }
      }
    });
});

module.exports = router;
