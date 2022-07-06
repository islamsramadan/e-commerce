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

module.exports.getOrderById=(req,res,next)=>{
    orders.find({_id:req.params.id}).then(data=>{
        if(data==null) next(new Error(" orders not found"))
        res.status(200).json(data);
    }).catch(err=>next(err))
}

module.exports.addOrders=(req,res,next)=>{
    const order = new orders({
        userId : req.body.id,
        orderItems : req.body.orderItems,
        paymentMethod:req.body.paymentMethod,
        paymentResult : req.body.paymentResult,
        shippingPrice: req.body.shippingPrice,
        totalPrice:req.body.totalPrice,
        isPaid:req.body.isPaid,
        status:req.body.status
    })
    order.save() .then(data=>{
        res.status(201).json({data:"added"});
      })
      .catch(error=>next(error))
}
module.exports.updateOrderToPaid=(req,res)=>{

    res.status(200).send("Update order To paid")
}
module.exports.updateOrderToDelivered=(req,res)=>{

    res.status(200).send(" update order to delivered")
}
