
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');
const isSellerOrAdmin = require('../middleware/isSellerOrAdmin');

const { allProductsController, viewProductController, productUpdateController ,productCreateController, productDeleteController, productCategory}  = require('../controller/Product.controller');

router.get('/all', allProductsController);
router.get('/category', productCategory);
router.get('/view/:id', viewProductController);
router.patch('/update', isAuth, isSellerOrAdmin, productUpdateController);
router.post('/create', isAuth, isSellerOrAdmin, productCreateController);
router.delete('/delete/:id', isAuth, isAdmin, productDeleteController);

module.exports = router;
