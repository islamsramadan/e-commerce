

module.exports.getOrders=(req,res)=>{

    res.status(200).send("Get all orders")
}

module.exports.getOrderById=(req,res)=>{

    res.status(200).send("Get single order ")
}
module.exports.updateOrderToPaid=(req,res)=>{

    res.status(200).send("Update order To paid")
}
module.exports.updateOrderToDelivered=(req,res)=>{

    res.status(200).send(" update order to delivered")
}
