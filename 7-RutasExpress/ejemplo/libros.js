const express = require("express");

const router = express.Router();
const app = express();

router.get("/", (req, res) => {
  res.send("Todo bien desde libros");
});

router.post("/anyadir", (req, res) => {
  app.locals.db.collection("libros");
});

module.exports = router;
