// const printouts = require("../model/printout")
const payments = require("../model/payment")
// const customers = require("../model/user")

exports.payment = async (req,res) =>{
    const paymentData = req.body;
    if(!paymentData){ res.status(402).json({ errors: "Payment Details missing" });}
    const paymentDetails = new payments(paymentData);
    paymentDetails= await paymentDetails.save()
    return res.send(paymentDetails);
}