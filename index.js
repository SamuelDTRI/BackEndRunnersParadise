const loadDatabase = require("./loadDatabase");
const { sequelize } = require("./server/src/db");
const { Product } = require("./server/src/db");
const server = require("./server/src/server");

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
