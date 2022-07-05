const mongoose=require("mongoose");
require("../models/order");
const orders = mongoose.model("orders")


module.exports.getOrders=(req,res)=>{
    orders.find().populate({path:"userId"})
    // .populate({path:"productId"}).populate({path:"businessId"})
    //{name:1,email:1}        
    .then(data=>{
              console.log();
                res.status(200).json(data);
                
            })
            .catch(error=>next(error))
}

module.exports.getOrderById=(req,res)=>{

    res.status(200).send("Get single order ")
}

module.exports.addOrders=(req,res)=>{
    const order = new orders({
        userId : req.body.id,
        orderItems : req.body.orderItems,
        paymentMethod:req.body.paymentMethod,
        
    })
}
module.exports.updateOrderToPaid=(req,res)=>{

    res.status(200).send("Update order To paid")
}
module.exports.updateOrderToDelivered=(req,res)=>{

    res.status(200).send(" update order to delivered")
}
