const loadDatabase = require("./loadDatabase");
const { sequelize } = require("./src/db");
const { Product } = require("./src/db");
const server = require("./src/server");

const PORT = 3000;

sequelize
  .sync({ force: true })
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
