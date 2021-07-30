/** @format */

const OrderModel = require("../model/Order.model");

const createOrder = async (req, res) => {
  if (req.body.orderItems.length === 0) {
    return res.status(401).send({ message: "Cart is Empty." });
  } else {
    try {
      const createOrder = new OrderModel({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });

      const response = await createOrder.save();
      return res
        .status(201)
        .send({ message: "Order Created.", order: response });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
};

const orderDetails = async (req, res) => {
  try {
    const details = await OrderModel.findById({ _id: req.params.id });
    if (details) {
      return res.status(200).send(details);
    } else {
      return res.status(404).send({ message: "Order not found." });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const orderPay = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ _id: req.params.id });
    if (order) {
      const updateOps = {
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        },
      };
      const updateOrder = await OrderModel.updateOne(
        { _id: order._id },
        { $set: updateOps }
      );
      res.status(201).send({ message: "Order Paid.."});
    } else {
      res.status(404).send({ message: "Order Not Found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const orderMine = async (req, res) => {
  try {
    const orderMineResponse = await OrderModel.find({});
    if (orderMineResponse.length > 0) {
      return res.status(200).send(orderMineResponse);
    } else {
      return res.status(404).send({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const orderListWithUser = async (req, res) => {
  const seller = req.query.seller || '';
  const sellerFilter = seller ? { seller } : {} 
  try {
    const orderList = await OrderModel.find({...sellerFilter}).populate('user', 'name');
    if(orderList.length > 0) {
      return res.status(200).send(orderList);
    }
      res.status(401).send({message: 'Order not found.'});    
  } 
  catch(error) {
    res.status(500).send({ message: error.message });
  }
}


const orderDeleteController = async (req, res) => {
  try {
    const orderDeleted = await OrderModel.deleteOne({ _id: req.params.id });
    if (orderDeleted) {
      return res.status(200).send({ message: "Order Deleted." });
    }
    return res.status(401).send({ message: "Order not found." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};




const orderDelivered = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ _id: req.params.id });
    console.log(req.params.id);
    if (order) {
      const updateOps = {
        isDelivered: true,
        deliveredAt: Date.now(),
      };
      const updateOrder = await OrderModel.updateOne(
        { _id: order._id },
        { $set: updateOps }
      );
      res.status(201).send({ message: "Order Delivered"});
    } else {
      res.status(404).send({ message: "Order Not Found." });
    }
  } catch (error) {
    console.log('I am t egae')
    res.status(500).send({ message: error.message });
  }
};




module.exports = {
  createOrder,
  orderPay,
  orderDetails,
  orderMine,
  orderListWithUser,
  orderDeleteController,
  orderDelivered
};

