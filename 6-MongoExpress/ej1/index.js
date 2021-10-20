const express = require("express");
const app = express();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  err
    ? (console.log("🔴 MongoDB no conectado"), console.log(`error: ${err}`))
    : ((app.locals.db = client.db("pruebas")),
      console.log("🟢 MongoDB está conectado"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/mesas", (req, res) => {
  app.locals.db
    .collection("mesas")
    .find()
    .toArray(function (err, datos) {
      err
        ? (console.log(err), res.send({ mensaje: "error:" + err }))
        : (console.log(datos), res.send({ results: datos }));
    });
});

app.post("/api/anyadir", (req, res) => {
  app.locals.db.collection("mesas").insertOne(
    {
      tamanyo: req.body.tamanyo,
      color: req.body.color,
      material: req.body.material,
      patas: req.body.patas,
    },
    function (err, datos) {
      err
        ? (console.log(err), res.send({ mensaje: "error:" + err }))
        : (console.log(datos), res.send({ results: datos }));
    }
  );
});

app.put("/api/modificar/:color", (req, res) => {
  app.locals.db
    .collection("mesas")
    .updateMany(
      { color: req.params.color },
      { $set: { color: "Granate" } },
      function (err, datos) {
        err
          ? (console.log(err), res.send({ mensaje: "error:" + err }))
          : (console.log(datos), res.send({ results: datos }));
      }
    );
});

app.delete("/api/borrar/:patas", (req, res) => {
  app.locals.db
    .collection("mesas")
    .deleteMany({ patas: parseInt(req.params.patas) }, function (err, datos) {
      err
        ? (console.log(err), res.send({ mensaje: "error:" + err }))
        : (console.log(datos), res.send({ results: datos }));
    });
});

app.listen(process.env.PORT || 3000);
