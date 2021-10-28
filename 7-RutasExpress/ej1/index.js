const express = require("express");
const app = express();
require("dotenv").config();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let clientes = require("./clientes");
let reservas = require("./reservas");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/clientes", clientes);
app.use("/reservas", reservas);

MongoClient.connect(
  process.env.URL_MONGO || "mongodb://localhost:27017",
  function (err, client) {
    err
      ? (console.log("🔴 MongoDB no conectado"), console.log(`error: ${err}`))
      : ((app.locals.db = client.db("hotel")),
        console.log("🟢 MongoDB está conectado"));
  }
);

app.listen(process.env.PORT || 3000);
