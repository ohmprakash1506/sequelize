//* importing sequelize

const { Sequelize, DataTypes } = require("sequelize");

//*importing the sequelize instance from config file

const sequelize = require("../config/database.js");

//* creating a model that is a table in the database

const post = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = post;
