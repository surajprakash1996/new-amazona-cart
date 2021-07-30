const express = require("express");
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const isSellerOrAdmin = require('../middleware/isSellerOrAdmin');

const { orderDelivered, createOrder, orderDetails, orderPay, orderMine, orderDeleteController, orderListWithUser}  = require('../controller/Order.controller');

router.post("/create-order", isAuth, createOrder);
router.get('/order-details/:id', isAuth, orderDetails);
router.get('/order-mine', isAuth, orderMine);
router.get('/order-list', isAuth, isSellerOrAdmin, orderListWithUser);
router.patch('/:id/order-pay', isAuth, orderPay);
router.delete('/delete/:id', isAuth, isAdmin, orderDeleteController);
router.patch('/:id/order-delivered', isAuth, isAdmin, orderDelivered);




module.exports = router;