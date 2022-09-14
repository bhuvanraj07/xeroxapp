const express = require('express')
const router = express.Router();


// This for login and registration routes (both case)
router.get("/",(req,res)=>{
    res.render('index')
})

router.get("/login/user_login",(req,res)=>{
  res.render('login/user_login')
})

router.get("/register/user_register",(req,res)=>{
  res.render('signup/user_signup')
})

router.get("/login/store_login",(req,res)=>{
  res.render('login/store_login')
})

router.get("/register/store_register",(req,res)=>{
  res.render('signup/store_signup')
})


module.exports = router