let express = require("express");
let app = express();

let array = ["paco", "josefa", "manolo", "eustaquia", "bartolo"];

app.get("/persona", function (req, res) {
  let respuesta = "";
  for (let i = 0; i < array.length; i++) {
    respuesta += `<li>${array[i]}</li>`;
  }
  res.send(`<ul>${respuesta}</ul>`);
});

app.get("/persona/:nombre", function (req, res) {
  let respuesta = "";
  for (let i = 0; i < array.length; i++) {
    if (req.params.nombre === array[i]) {
      respuesta = `<h3>${array[i]}</h3>`;
      break;
    } else {
      respuesta = `<h3>No se ha encontrado </h3>`;
    }
  }
  res.send(respuesta);
});

app.listen(3000);
