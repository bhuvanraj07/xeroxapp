const store = require("../model/store");
const printouts = require("../model/printouts")
const customers = require("../model/customers");
const payments = require("../model/payments");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../db/dbconnect");

exports.userOrders = async (req,res,userData) =>{
    try{
    const orders = await printouts.findAll({ where: {
        customer_user_id:userData.email_id
      }});
    if(!orders){
        res.status(402).json({ errors: "No order yet" });
    }
    res.send(orders)
}catch(err){
    res.status(402).json({ errors: err });
}
}

exports.newOrder = async (req,res) =>{
    const orderData = req.body;
    // res.send(orderData);
    if(!orderData){ res.status(402).json({ errors: "No order details entered" });}
    
    // const storeData = await store.findOne({where:{
        // store_name:orderData.store_name
    // }})
    const orderAmt=orderData.payment_amount;
    delete orderData.payment_amount;

    const email=orderData["customer_user_id"];
    // res.send(orderData);
    // orderData["store_id"]=storeData.store_id;
   
    let printOrder = new printouts(orderData);
    printOrder= await printOrder.save()
    let print_id=printOrder.print_id;

    let paymentdetails = new payments({
        "print_id":print_id,
        "payment_amount": orderAmt,
    })
    paymentdetails=await paymentdetails.save();

    // res.send(paymentdetails);
    const customerorders = await sequelize.query(
        'SELECT s.store_name,p.print_status,p.print_id,pay.payment_amount,pay.payment_status from stores s,printouts p,payments pay where p.customer_user_id=? and p.print_id=pay.print_id AND s.store_id=p.store_id',
        // 'SELECT * from printouts',
        {
            replacements: [email],
            type: QueryTypes.SELECT,
        }
    );

    res.render('user/dashboard', {customerorders});

}

exports.updatePayment = async (req, res) => {
    const orderData = req.body;
    // res.send(req.body);
    if (!orderData) { res.status(402).json({ errors: "No order details entered" }); }
    
    const ref=orderData.reference;
    const printid = orderData.print_id;
    const email = orderData.customer_user_id;
    const updating = await sequelize.query(
        'UPDATE payments SET payment_reference = ?,payment_status="Awaiting Payment Confirmation" WHERE print_id=?',
        // 'SELECT * from printouts',
        {
            replacements: [ref,printid],
            type: QueryTypes.INSERT,
        }
    );
    

    const customerorders = await sequelize.query(
        'SELECT s.store_name,p.print_status,p.print_id,pay.payment_amount,pay.payment_status from stores s,printouts p,payments pay where p.customer_user_id=? and p.print_id=pay.print_id AND s.store_id=p.store_id',
        // 'SELECT * from printouts',
        {
            replacements: [email],
            type: QueryTypes.SELECT,
        }
    );

    res.render('user/dashboard', { customerorders });

}
