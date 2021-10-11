let express = require("express");
let app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hola Mundo</h1><br /><h3>desde Express</h3>");
});

app.listen(3000);
