const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbconnect");


const customers = sequelize.define("customers", {
  email_id: {
    type: DataTypes.STRING,
        allowNull:false,
        isEmail: true,
        primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// sequelize.sync({force:false})
module.exports = customers;