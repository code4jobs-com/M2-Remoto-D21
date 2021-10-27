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

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/libros", (req, res) => {
  app.locals.db
    .collection("libros")
    .find()
    .toArray(function (err, datos) {
      err
        ? res.send({ error: true, data: datos, mensaje: err })
        : res.send({ error: false, data: datos, mensaje: "Respuesta OK" });
    });
});

app.get("/api/libros/:titulo", (req, res) => {
  // TODO añadir un sistema de aviso para 0 resultados
  app.locals.db
    .collection("libros")
    .find({ titulo: req.params.titulo })
    .toArray(function (err, datos) {
      err
        ? res.send({ error: true, data: datos, mensaje: err })
        : res.send({ error: false, data: datos, mensaje: "Respuesta OK" });
    });
});

app.post("/api/nuevoLibro/:titulo", (req, res) => {
  app.locals.db
    .collection("libros")
    .insertOne(
      { titulo: req.params.titulo, leido: false },
      function (err, datos) {
        err
          ? res.send({ error: true, data: datos, mensaje: err })
          : res.send({ error: false, data: datos, mensaje: "Respuesta OK" });
      }
    );
});

app.put("/api/editarLibro/:titulo", (req, res) => {
  app.locals.db
    .collection("libros")
    .updateOne(
      { titulo: req.params.titulo },
      { $set: { leido: true } },
      function (err, datos) {
        err
          ? res.send({ error: true, data: datos, mensaje: err })
          : res.send({ error: false, data: datos, mensaje: "Respuesta OK" });
      }
    );
});

app.delete("/api/borrarLibro/:titulo", (req, res) => {
  app.locals.db
    .collection("libros")
    .deleteOne({ titulo: req.params.titulo }, function (err, datos) {
      err
        ? res.send({ error: true, data: datos, mensaje: err })
        : res.send({ error: false, data: datos, mensaje: "Respuesta OK" });
    });
});

app.listen(process.env.PORT || 3000);
