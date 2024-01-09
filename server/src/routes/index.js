const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send("hola");
});
router.post("/upload", (req, res) => {
  res.send("hola");
});


module.exports = router;