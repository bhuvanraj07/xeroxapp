require("dotenv").config({path:'../.env'});
const { Sequelize } = require("sequelize"); //mysql orm sequelize
//setting up mysql connection
const sequelize = new Sequelize(
  process.env.DB_MYSQL_NAME,
  process.env.DB_MYSQL_USER,
  process.env.DB_MYSQL_PASSWORD,
  {
    host: process.env.DB_MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
  // "test_db",
  // "root",
  // "password",
  // {
  //   host: "localhost",
  //   dialect: "mysql",
  //   logging: false,
  // }
);

sequelize.sync({ force: false, alter: true })

//function to check mysql connection
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


checkConnection();


module.exports = {sequelize};