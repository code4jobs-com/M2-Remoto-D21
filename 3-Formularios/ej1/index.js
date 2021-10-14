const express = require("express");
let app = express();

let animales = require("./animales");

app.use(express.static("public"));

app.get("/animales", (req, res) => {
  res.send(animales);
});

app.get("/sumar-animal", (req, res) => {
  let animal = {
    nombre: req.query.nombre,
    tipo: req.query.tipo,
    edad: parseInt(req.query.edad),
  };
  animales.push(animal);
  res.send(`<h5>Animal añadido</h5>`);
});

app.get("/dejar-animal", (req, res) => {
  res.send(`<form action="/sumar-animal">
  <input type="text" name="nombre" placeholder="nombre" />
  <input type="text" name="tipo" placeholder="tipo" />
  <input type="text" name="edad" placeholder="edad" />
  <button type="submit">Enviar</button>
</form>`);
});

app.get("/adoptar", (req, res) => {
  console.log(req.query.nombre);
  for (let i = 0; i < animales.length; i++) {
    if (animales[i].nombre === req.query.nombre) {
      animales.splice(i, 1);
      res.send("<h3>Animal adoptado</h3>");
      break;
    }
  }
  res.send("<h3>No se ha encontrado ese animal</h3>");
});

app.listen(process.env.PORT || 3000);
