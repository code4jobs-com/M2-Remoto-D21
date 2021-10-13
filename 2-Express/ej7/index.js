const express = require("express");

let app = express();

let aleatorio = require("./aleatorio");
let array = require("./array");

app.get("/sumar", function (req, res) {
  array[aleatorio()]++;
  res.send(array);
});

app.listen(process.env.PORT || 3000);
