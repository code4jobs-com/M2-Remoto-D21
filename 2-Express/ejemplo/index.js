let express = require("express");

let app = express();

app.get("/", function (request, response) {
  response.send("<h1>hola mundo</h1>");
});

app.get("/patata", function (request, response) {
  response.send([
    {
      nombre: "Macarena",
    },
    {
      nombre: "Rober",
    },
    {
      nombre: "Jimeno",
    },
  ]);
});

/* app.get("/persona/nombre", function (request, response) {
  response.send("hola");
});

app.get("/persona/rober", function (request, response) {
  response.send("hola robert");
});

app.get("/persona/jimena", function (request, response) {
  response.send("hola Jimena");
});
 */
/* app.get("/persona/:nombre", function (request, response) {
  let nombre = request.params.nombre;
  response.send(`hole ${nombre}`);
}); */

app.get(
  "/persona/nombre/:nombre/apellidos/:apellidos",
  function (request, response) {
    console.log(request.params);
    let nombre = request.params.nombre;
    /* let apellidos = request.params.apellidos; */
    response.send(`hola ${nombre}, ${request.params.apellidos}`);
  }
);

app.listen(process.env.PORT || 3000);
