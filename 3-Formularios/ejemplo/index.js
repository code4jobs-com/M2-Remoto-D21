const express = require("express");
let app = express();

app.use(express.static("public"));

app.get("/patata", function (req, res) {
  res.send("patata");
});

//rutas

app.listen(process.env.PORT || 3000);
