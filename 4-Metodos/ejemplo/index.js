const express = require("express");
let app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body.nombre);
  res.send(`<h3>Hola ${req.body.nombre}</h3>`);
});

app.put("/put", (req, res) => {
  console.log(req.body.nombre);
  res.send({ respuesta: "todo ok" });
});

app.listen(process.env.PORT || 3000);
