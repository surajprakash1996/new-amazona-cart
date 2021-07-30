/** @format */

const UserModel = require("../model/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../middleware/generateToken");
const { find } = require("../model/User.model");

const userSignIn = async (req, res, next) => {
  try {
    const result = await UserModel.findOne({ email: req.body.email });
    if (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        const payload = {
          _id: result._id,
          name: result.name,
          email: result.email,
          isSeller: result.isSeller,
          isAdmin: result.isAdmin,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        return res.status(200).send({
          _id: result._id,
          name: result.name,
          email: result.email,
          isAdmin: result.isAdmin,
          isSeller: result.isSeller,
          token: token,
        });
      }
      return res.status(401).send({ message: "Password not Match" });
    }
    return res.status(401).send({ message: "Email not match." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const userProfileDetails = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

const userProfileUpdate = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user._id });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.sellerName = req.body.sellerName || user.seller.sellerName;
        user.seller.sellerDescription =
          req.body.sellerDescription || user.seller.sellerDescription;
        user.seller.sellerLogo = req.body.sellerLogo || user.seller.sellerLogo;
        user.seller.sellerNumbReviews = 334;
        user.seller.sellerRatings = 4.5;
      }
      if (req.body.password) {
        user.password = bcrypt.hash(req.body.password, 10);
      }
      const updateUser = await UserModel.updateOne(
        { _id: user._id },
        { $set: user }
      );
      if (updateUser) {
        const updatedUser = await UserModel.findOne({ _id: req.user._id });
        res.status(200).send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isSeller: updateUser.isSeller,
          seller: updateUser.seller,
          token: generateToken(user),
        });
      } else {
        res.status(500).send({ message: "Update fail..." });
      }
    } else {
      res.status(404).send({ message: "User not Found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const userListController = async (req, res) => {
  try {
    const user = await UserModel.find({});
    if (user.length > 0) {
      return res.status(200).send(user);
    }
    res.status(400).send({ message: "Users not exits." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const userListDetail = async (req, res) => {
  try {
    const isUserFound = await UserModel.findOne({ _id: req.params.id });
    if (isUserFound) {
      return res.status(200).send({
        _id: isUserFound._id,
        name: isUserFound.name,
        email: isUserFound.email,
        isSeller: isUserFound.isSeller,
        isAdmin: isUserFound.isAdmin,
      });
    }
    res.status(400).send({ message: "User not Found." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const userListUpdate = async (req, res) => {
  try {
    const isUserFound = await UserModel.findOne({ _id: req.params.id });

    if (isUserFound) {
      isUserFound.name = req.body.name || isUserFound.name;
      isUserFound.email = req.body.email || isUserFound.email;
      isUserFound.isAdmin =
        req.body.isAdmin === isUserFound.isAdmin
          ? isUserFound.isAdmin
          : req.body.isAdmin;
      isUserFound.isSeller =
        req.body.isSeller === isUserFound.isSeller
          ? isUserFound.isSeller
          : req.body.isSeller;

      const updatedUser = await UserModel.updateOne(
        { _id: isUserFound._id },
        { $set: isUserFound }
      );

      if (updatedUser) {
        return res.status(200).send({ message: "User updated." });
      }
      res.status(401).send({ message: "User update fail" });
    }
    res.status(400).send({ message: "User not Found." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const userDeleteController = async (req, res) => {
  try {
    const isUserFound = await UserModel.findOne({ _id: req.params.id });
    if (isUserFound) {
      const deletedUser = await UserModel.deleteOne({ _id: isUserFound._id });
      if (deletedUser) {
        return res.status(200).send({ message: "User deleted." });
      }
      res.status(401).send({ message: "User delete fail." });
    }
    res.status(404).send({ message: "User not Found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



const topSellerCarouselController = async (req, res) => {
  try {
    const topSellerProduct = await UserModel.find({isSeller: true, isAdmin:false}).sort({'seller.sellerRatings': -1}).limit(3);
    res.status(200).send(topSellerProduct);
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}


module.exports = {
  userSignIn,
  userProfileDetails,
  userProfileUpdate,
  userListController,
  userListDetail,
  userListUpdate,
  userDeleteController,
  topSellerCarouselController
};
