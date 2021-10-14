const express = require("express");
let app = express();

let personas = require("./personas");

app.use(express.static("public"));

app.get("/personas", (req, res) => {
  res.send(personas);
});

app.listen(process.env.PORT || 3000);
