const express = require("express");
let app = express();

let array = ["Guillermo", "Edgardo", "Jessica"];

app.get("/profesor/:nombre", function (req, res) {
  array.push(req.params.nombre);
  res.send(array);
});

app.listen(process.env.PORT || 3000);
