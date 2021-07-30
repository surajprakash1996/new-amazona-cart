/** @format */

const mongoose = require("mongoose");
const ProductModel = require("../model/Products.model");

const allProductsController = async (req, res) => {

  const seller = req.query.seller || '';
  const sellerFilter = seller ? { seller } : {};

  const name = req.query.name || '';
  const order = req.query.order || '' ;
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  
  const category = req.query.category || '';
  const categoryFilter = category ? { category } : {};
  
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0
  const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0
  const filterPrice = min && max ? {price: {$gte: min, $lte: max} } : { };

  const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0
  const filterRating = rating ? {rating: {$gte: rating} } : {};
  
  const sortOrder =  order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
  try {
    const products = await ProductModel.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...filterPrice,
      ...filterRating
    }).sort(sortOrder).populate("seller", "seller.sellerName seller.sellerLogo");
    res.send(products);
  } catch (err) {
    res.status(500).json(err);
  }
};


const productCategory = async (req, res) => {
  try {
    const categories = await ProductModel.find().distinct('category');
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

const viewProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id }).populate(
      "seller"
    );
    res.send(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const productUpdateController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.body.id });
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.image = req.body.image || product.image;
      product.brand = req.body.brand || product.brand;
      product.category = req.body.category || product.category;
      product.reviews = req.body.reviews || product.reviews;
      product.rating = req.body.rating || product.rating;
      product.description = req.body.description || product.description;

      const updateProduct = await ProductModel.updateOne(
        { _id: req.body.id },
        { $set: product }
      );

      if (updateProduct) {
        res.status(200).send({
          message: "Product Updated.",
        });
      } else {
        res.status(500).send({ message: "Update fail..." });
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const productCreateController = async (req, res) => {
  try {
    const productName = await ProductModel.find({ name: req.body.name });

    if (productName.length > 0) {
      return res.status(401).send({
        message: "Product name already exist. Please change product name.",
      });
    }

    const productCreate = new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      seller: req.user._id,
      price: req.body.price,
      countInStock: req.body.countInStock,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      reviews: req.body.reviews,
      rating: req.body.rating,
      description: req.body.description,
    });

    const savedProduct = await productCreate.save();

    if (savedProduct) {
      return res.status(201).send(savedProduct);
    }
    res.status(401).send({ message: "Product create fail." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const productDeleteController = async (req, res) => {
  try {
    const productDeleted = await ProductModel.deleteOne({ _id: req.params.id });
    if (productDeleted) {
      return res.status(200).send({ message: "Product Deleted." });
    }
    return res.status(401).send({ message: "Product not Found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  allProductsController,
  viewProductController,
  productUpdateController,
  productCreateController,
  productDeleteController,
  productCategory,
};
