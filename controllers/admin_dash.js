const store = require("../model/admin");
const printouts = require("../model/printout")

exports.storeOrders = async (req,res,storeData) =>{
    try{
    const orders = await printouts.findAll({ where: {
        store_id:storeData.store_id
      }});
    if(!orders){
        res.status(402).json({ errors: "No order yet" });
    }
    return res.send(orders)
}catch(err){
    res.status(402).json({ errors: err });
}
}