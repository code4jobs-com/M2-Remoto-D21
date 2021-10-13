const express = require("express");

let app = express();

let aleatorio = require("./aleatorio");
let array = require("./array");

app.get("/sumar", function (req, res) {
  array[aleatorio()]++;
  res.send(array);
});

app.get("/borrar/:numero", function (req, res) {
  for (let i = 0; i < array.length; i++) {
    array[i] === parseInt(req.params.numero)
      ? (array[i] = 0)
      : (array[i] = array[i]);
  }

  res.send(array);
});

app.listen(process.env.PORT || 3000);
