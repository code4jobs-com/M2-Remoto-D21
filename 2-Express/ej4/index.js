const express = require("express");
let app = express();

let saludar = require("./funcion");

app.get("/saludar", function (req, res) {
  res.send(`<h3>${saludar()}</h3>`);
});

app.listen(process.env.PORT || 3000);
