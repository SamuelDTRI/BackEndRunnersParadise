const { sequelize } = require("./server/src/db");
const server = require("./server/src/server");
const PORT = 3000;

sequelize.sync({ force: false }).then(
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
);
