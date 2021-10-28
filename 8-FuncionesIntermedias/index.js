const express = require("express");
let app = express();

const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

const bcrypt = require("bcrypt");

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  err
    ? (console.log("🔴 MongoDB no conectado"), console.log(`error: ${err}`))
    : ((app.locals.db = client.db("pruebas")),
      console.log("🟢 MongoDB está conectado"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/crearUsuario", cifrarContrasenya, function (req, res) {
  console.log(req.body);
  app.locals.db
    .collection("usuarios")
    .insertOne(req.body, function (err, data) {
      err
        ? res.send({ error: true, mensaje: err })
        : res.send({ error: false, mensaje: "usuario creado" });
    });
});

app.get("/login", developer, ip, (req, res) => {
  app.locals.db
    .collection("usuarios")
    .find({ user: req.body.user })
    .toArray(function (err, data) {
      if (err) {
        res.send({ error: true, mensaje: err });
      } else {
        if (data.length > 0) {
          bcrypt.compareSync(req.body.pass, data[0].pass)
            ? res.send({ error: false, mensaje: "login correcto" })
            : res.send({ error: true, mensaje: "contraseña incorrecta" });
        } else {
          res.send({ error: true, mensaje: "usuario no encontrado" });
        }
      }
    });
});

function cifrarContrasenya(req, res, next) {
  req.body.pass = bcrypt.hashSync(req.body.pass, 10);
  next();
}

function ip(req, res, next) {
  console.log("la llamada viene de : " + req.ip);
  next();
}

function developer(req, res, next) {
  console.log("el servidor ha recibido la llamada: ");
  console.log(req.body);
  next();
}

app.listen(3000);
