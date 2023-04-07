//* creating the database connection

//*importing sequelize module
const Sequelize = require("sequelize");
const sequelize = new Sequelize("api", "root", "ohm97877", {
  dialect: "mysql",
});

module.exports = sequelize;
