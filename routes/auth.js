const express = require('express')
const router = express.Router();
const login_register = require('../controllers/login_register')
const user_dash=require("../controllers/user_dash")
const { QueryTypes } = require('sequelize');
const {sequelize}=require("../db/dbconnect")

// This is for authentication with the database and rendering the dash board after authenticating
router.post("/user_dash_login", login_register.CustomerLogin)

router.post("/user_dash_register",login_register.CustomerRegister)

router.post("/store_dash_login",login_register.StoreLogin)

router.post("/store_dash_register",login_register.StoreRegister)

router.get("/neworder",async function(req,res){
    const storedetails = await sequelize.query(
        'SELECT store_id,store_name FROM stores',
        {
            type: QueryTypes.SELECT,
        }
    );
    res.render('user/neworder',{storedetails})
});

router.get("/payment/:printid",async function(req,res){
    const print_id = req.params.printid;
        // console.log(print_id)
        const orderdetails = await sequelize.query(
            'SELECT p.print_id,pay.payment_amount,s.upi_id,s.store_name,pay.payment_status FROM printouts p,payments pay,stores s WHERE p.print_id=? AND p.print_id=pay.print_id AND p.store_id=s.store_id',
            {
                replacements: [print_id],
                type: QueryTypes.SELECT,
            }
        );
        // console.log(orderdetails)
        res.render("user/payments",{orderdetails})
    
})

router.get("/storeorderdetails/:printid", async function (req, res) {
    const print_id = req.params.printid;
    // console.log(print_id)
    // res.send(print_id);
    const orderdetails = await sequelize.query(
        'SELECT p.print_id,p.store_id,p.no_of_copies,p.comments,p.document_link,pay.payment_amount,pay.payment_status,pay.payment_reference,pay.pymt_id FROM printouts p,payments pay WHERE p.print_id=pay.print_id AND p.print_id=?',
        {
            replacements: [print_id],
            type: QueryTypes.SELECT,
        }
    );
    // console.log(orderdetails)
    res.render("store/orderdetails", { orderdetails })


})

router.get("/storeconfirmpayment/:printid/:storeid", async function (req, res) {
    const print_id = req.params.printid;
    const storeid = req.params.storeid;
    // console.log(print_id);
    // console.log(store_id);
    // console.log(print_id)
    // res.send(print_id);
    const updating1 = await sequelize.query(
        'UPDATE payments SET payment_status="confirmed" WHERE print_id=?',
        {
            replacements: [print_id],
            type: QueryTypes.UPDATE,
        }
    );
    const updating2 = await sequelize.query(
        'UPDATE printouts SET print_status="under process" WHERE print_id=?',
        {
            replacements: [print_id],
            type: QueryTypes.UPDATE,
        }
    );
    const customerorders = await sequelize.query(
        'select c.customer_name,p.print_status,p.print_id from printouts p,customers c where p.store_id=? AND p.customer_user_id=c.email_id',
        {
            replacements: [storeid],
            type: QueryTypes.SELECT,
        }
    ); 

    // console.log(orderdetails)
    res.render("store/dashboard", { customerorders })


})

router.get("/storedeliveredorder/:printid/:storeid", async function (req, res) {
    const print_id = req.params.printid;
    const storeid = req.params.storeid;
    // console.log(print_id);
    // console.log(store_id);
    // console.log(print_id)
    // res.send(print_id);
    const updating1 = await sequelize.query(
        'UPDATE payments SET payment_status="confirmed" WHERE print_id=?',
        {
            replacements: [print_id],
            type: QueryTypes.UPDATE,
        }
    );
    const updating2 = await sequelize.query(
        'UPDATE printouts SET print_status="delivered" WHERE print_id=?',
        {
            replacements: [print_id],
            type: QueryTypes.UPDATE,
        }
    );
    const customerorders = await sequelize.query(
        'select c.customer_name,p.print_status,p.print_id from printouts p,customers c where p.store_id=? AND p.customer_user_id=c.email_id',
        {
            replacements: [storeid],
            type: QueryTypes.SELECT,
        }
    );

    // console.log(orderdetails)
    res.render("store/dashboard", { customerorders })


})


router.post("/updatepayment", user_dash.updatePayment)

router.post("/createneworder",user_dash.newOrder)

module.exports = router