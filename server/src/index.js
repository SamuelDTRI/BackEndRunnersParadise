const loadDatabase = require("./loadDatabase");
const { sequelize } = require("./db");
const { Product } = require("./db");
const server = require("./server");

const PORT = 3000;

sequelize
  .sync({ force: false })
  .then(async () => {
    const allSnikers = await Product.findAll();
    if (!allSnikers.length) {
      loadDatabase();
    } else {
      console.log("Database Loaded");
    }
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
