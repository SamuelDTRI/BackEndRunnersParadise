const { Router } = require("express");
const {detail} = require("../controllers/getAllProducts")
const {getById} = require ("../controllers/getDetailProduct.js")
const router = Router();

router.get("/", (req, res) => {
  res.send("hola");
});
router.post("/upload", (req, res) => {
  res.send("hola");
});

router.get("/all",detail )

router.get('/detail/:idKey',getById);

module.exports = router;
