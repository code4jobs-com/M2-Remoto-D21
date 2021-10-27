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

let libros = require("./libros");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/libros", libros);

app.get("/", (req, res) => {
  res.send("Todo ha ido bien desde el servidor base");
});

app.listen(process.env.PORT || 3000);
