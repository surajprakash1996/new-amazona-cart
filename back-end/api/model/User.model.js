/** @format */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    seller: {
      sellerName: {
        type: String,
        required: true,
      },
      sellerLogo: {
        type: String,
        required: true,
      },
      sellerDescription: {
        type: String,
        required: true,
      },
      sellerNumbReviews: {
        type: Number,
        required: true,
      },
      sellerRatings: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
