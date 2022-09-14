const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbconnect");


const payments = sequelize.define("payments", {
  pymt_id: {
    type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
  },
  print_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:"UPI"
  },
  payment_reference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'Pending'
  },
  payment_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

// sequelize.sync({force:true})
module.exports = payments;