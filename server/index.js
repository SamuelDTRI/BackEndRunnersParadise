require("dotenv").config();
const { sequelize } = require("./src/db");
const server = require("./src/server");

sequelize.sync({ force: false }).then(
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000 }`);
  })
);