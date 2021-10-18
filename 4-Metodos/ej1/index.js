const express = require("express");
let app = express();

let personas = require("./personas");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/personas", (req, res) => {
  res.send(personas);
});

app.post("/anyadir", (req, res) => {
  console.log(req.body);
  let persona = req.body.persona;
  personas.push(persona);
  console.log(personas);
  res.send({ mensaje: "todo correcto" });
});

app.put("/modificar", (req, res) => {
  let found = false;
  for (let i = 0; i < personas.length; i++) {
    if (
      req.body.persona.nombre.toLowerCase() === personas[i].nombre.toLowerCase()
    ) {
      personas[i].apellido = req.body.persona.apellido;
      personas[i].edad = req.body.persona.edad;
      console.log(personas);
      found = true;
    }
  }
  found
    ? res.send({ mensaje: "Persona modificada" })
    : res.send({ mensaje: "No se ha encontrado" });
});

app.delete("/borrar", (req, res) => {
  let found = false;
  for (let i = 0; i < personas.length; i++) {
    if (req.body.nombre.toLowerCase() === personas[i].nombre.toLowerCase()) {
      personas.splice(i, 1);
      console.log(personas);
      found = true;
    }
  }
  found
    ? res.send({ mensaje: "Persona borrada" })
    : res.send({ mensaje: "No se ha encontrado" });
});

app.listen(process.env.PORT || 3000);
