const { sequelize } = require("./src/db");
const server = require("./src/server");
const PORT = 3000;

sequelize.sync({ force: false }).then(
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
);
