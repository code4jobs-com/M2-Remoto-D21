const express = require("express");
const router = express.Router();

router.post("/checkin", (req, res) => {
  req.app.locals.db
    .collection("clientes")
    .find({ dni: req.body.dni })
    .toArray((err, data) => {
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "No se ha podido realizar la consulta a la BBDD",
        });
      } else {
        if (data.length === 0) {
          res.send({
            error: true,
            data: data,
            mensaje: "No se ha encontrado el usuario",
          });
        } else {
          req.app.locals.db
            .collection("habitaciones")
            .find({ num: req.body.num })
            .toArray((err1, data1) => {
              if (err) {
                res.send({
                  error: true,
                  data: err1,
                  mensaje: "No se ha podido realizar la consulta a la BBDD",
                });
              } else {
                if (!data1[0].libre) {
                  res.send({
                    error: true,
                    data: data1,
                    mensaje: `La habitación ${req.body.num} no está libre`,
                  });
                } else {
                  req.app.locals.db.collection("reservas").insertOne(
                    {
                      cliente: req.body.dni,
                      habitacion: req.body.num,
                      checkin: req.body.checkin,
                      checkout: "",
                      activa: true,
                    },
                    (err2, data2) => {
                      if (err2) {
                        res.send({
                          error: true,
                          data: err2,
                          mensaje:
                            "No se ha podido realizar la consulta a la BBDD",
                        });
                      } else {
                        if (data2.insertedId === undefined) {
                          res.send({
                            error: true,
                            data: data2,
                            mensaje:
                              "No se ha realizado la reserva correctamente.",
                          });
                        } else {
                          req.app.locals.db
                            .collection("habitaciones")
                            .updateOne(
                              { num: req.body.num },
                              { $set: { libre: false } },
                              (err3, data3) => {
                                if (err3) {
                                  res.send({
                                    error: true,
                                    data: err3,
                                    mensaje:
                                      "No se ha podido realizar la consulta a la BBDD",
                                  });
                                } else {
                                  if (data3.modifiedCount === 0) {
                                    res.send({
                                      error: true,
                                      data: data3,
                                      mensaje: `No se ha podido cambiar el estado de la habitación ${req.body.num}`,
                                    });
                                  } else {
                                    res.send({
                                      error: false,
                                      data: data3,
                                      mensaje:
                                        "Reserva realizada correctamente",
                                    });
                                  }
                                }
                              }
                            );
                        }
                      }
                    }
                  );
                }
              }
            });
        }
      }
    });
});

router.put("/checkout", (req, res) => {
  req.app.locals.db
    .collection("clientes")
    .find({ dni: req.body.dni })
    .toArray((err, data) => {
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "No se ha podido realizar la consulta a la BBDD",
        });
      } else {
        if (data.length === 0) {
          res.send({
            error: true,
            data: data,
            mensaje: "El cliente no está registrado",
          });
        } else {
          req.app.locals.db
            .collection("reservas")
            .updateOne(
              { $and: [{ cliente: req.body.dni }, { activa: true }] },
              { $set: { checkout: req.body.checkout, activa: false } },
              (err1, data1) => {
                if (err1) {
                  res.send({
                    error: true,
                    data: err1,
                    mensaje: "No se ha podido realizar la consulta a la BBDD",
                  });
                } else {
                  if (data1.modifiedCount === 0) {
                    res.send({
                      error: true,
                      data: data1,
                      mensaje: "No se ha podido realizar el checkout",
                    });
                  } else {
                    req.app.locals.db
                      .collection("habitaciones")
                      .updateOne(
                        { num: req.body.num },
                        { $set: { libre: true } },
                        (err2, data2) => {
                          if (err2) {
                            res.send({
                              error: true,
                              data: err2,
                              mensaje:
                                "No se ha podido realizar la consulta a la BBDD",
                            });
                          } else {
                            if (data2.modifiedCount === 0) {
                              res.send({
                                error: true,
                                data: data2,
                                mensaje:
                                  "No se ha podido liberar la habitación",
                              });
                            } else {
                              res.send({
                                error: false,
                                data: data2,
                                mensaje: "Checkout realizado correctamente",
                              });
                            }
                          }
                        }
                      );
                  }
                }
              }
            );
        }
      }
    });
});

module.exports = router;
