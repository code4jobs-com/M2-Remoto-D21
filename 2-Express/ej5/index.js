const express = require("express");
let app = express();

persona = {
  nombre: "Paco",
  apellidos: "Gutierrez Sánchez",
  edad: 54,
};

app.get("/nombre/:nombre", function (req, res) {
  persona.nombre = req.params.nombre;
  res.send(`El nuevo nombre es ${persona.nombre}`);
});

app.get("/apellido/:apellido", function (req, res) {
  persona.apellido = req.params.apellido;
  res.send(`El nuevo apellido es ${persona.apellido}`);
});

app.get("/edad/:edad", function (req, res) {
  persona.edad = parseInt(req.params.edad);
  res.send(`La nueva edad es ${persona.edad}`);
});

app.get("/nombre/:nombre/apellidos/:apellidos/edad/:edad", function (req, res) {
  persona = {
    nombre: req.params.nombre,
    apellidos: req.params.apellidos,
    edad: parseInt(req.params.edad),
  };
  res.send("Todo ha ido bien ");
});

app.listen(process.env.PORT || 3000);
