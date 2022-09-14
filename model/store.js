const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbconnect");


const store = sequelize.define("store", {
  store_id: {
    type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
  },
  upi_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  store_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  store_address:{
      type:DataTypes.STRING,
      allowNull:false
  },
  admin_password:{
      type:DataTypes.STRING,
      allowNull:false
  }
});

// sequelize.sync({force:true})
module.exports = store;