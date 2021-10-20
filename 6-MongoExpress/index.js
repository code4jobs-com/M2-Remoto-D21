const { application } = require("express");
const express = require("express");
const app = express();

const mongodb = require("mongodb");

let MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  err
    ? (console.log("🔴 MongoDB no conectado"), console.log(`error: ${err}`))
    : ((app.locals.db = client.db("pruebas")),
      console.log("🟢 MongoDB está conectado"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  app.locals.db
    .collection("ejemplo")
    .find()
    .toArray(function (err, datos) {
      err
        ? (console.log(err), res.send({ mensaje: "error:" + err }))
        : (console.log(datos), res.send({ results: datos }));
    });
});

app.post("/anyadir", (req, res) => {
  app.locals.db
    .collection("ejemplo")
    .insertOne(
      { planeta: req.body.planeta, distanciaRecorrida: req.body.distancia },
      function (err, datos) {
        err
          ? (console.log(err), res.send({ mensaje: "error:" + err }))
          : (console.log(datos), res.send({ results: datos }));
      }
    );
});

app.put("/modificar", (req, res) => {
  app.locals.db
    .collection("ejemplo")
    .updateOne(
      { planeta: req.body.planeta },
      { $set: { distanciaRecorrida: req.body.distancia } },
      function (err, datos) {
        err
          ? (console.log(err), res.send({ mensaje: "error:" + err }))
          : (console.log(datos), res.send({ results: datos }));
      }
    );
});

app.delete("/borrar", (req, res) => {
  app.locals.db
    .collection("ejemplo")
    .deleteOne({ planeta: req.body.planeta }, function (err, datos) {
      err
        ? (console.log(err), res.send({ mensaje: "error:" + err }))
        : (console.log(datos), res.send({ results: datos }));
    });
});

app.listen(process.env.PORT || 3000);
