const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const path = require('path')
const app=express();
require("dotenv").config({path:'./.env'});

app.use(cors({}));
// app.use(express.json());
app.use(bodyParser.json());
app.use(
    express.urlencoded({
      extended: false,
    })
  );

  const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

  app.set('view engine', 'hbs') // to set the html template engine


//check the routes folder 
app.use('/',require('./routes/pages')); 

app.use('/auth',require('./routes/auth'))


app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is listening to port 5000")
})

// public folder is for css files and the such
// views folder is for hbs(html template) files (dont change the folder names)
// Note : When you use sequelize, the database becomes empty after restarting the server everytime so be careful
//          (most of my time went to realize this)


// i think this can be implemented to stop clearing, i am not sure where exactly to add this line but do check
// db.sequelize.sync({ force: false , alter : true })



// https://www.youtube.com/watch?v=VavWEtI5T7c&list=PLD9SRxG6ST3GBsczn8OUKLaErhrvOz9zQ&index=1   -----   This playlist might help you understand the routing part and rendering part
// https://www.youtube.com/watch?v=1aXZQcG2Y6I  == (53:22 Home - Querying data) This will help you understand how to add js objects in hbs files
// Leave the dbconnect , just enter the necessary field in .env file
// Dont try to change the file structure too much otherwise it will become difficult
// I have made some changes in the schema as well as database on column datatypes so check for that
// For the dependencies check package.json(You might know it but still)
//  Still some html files have to be made hbs (just changing the extension is enough)

