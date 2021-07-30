/** @format */

const express = require("express");
const router = express.Router();
const {
  userSignIn,
  userListUpdate,
  userProfileDetails,
  userProfileUpdate,
  userListController,
  userListDetail,
  userDeleteController,
  topSellerCarouselController
} = require("../controller/User.controller");

const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const isSellerOrAdmin = require("../middleware/isSellerOrAdmin");

router.post("/sign-in", userSignIn);
router.get("/user-profile-detail/:id", isAuth, isSellerOrAdmin , userProfileDetails);
router.patch("/user-update-profile", isAuth, isSellerOrAdmin, userProfileUpdate);
router.get("/user-list", isAuth, isAdmin, userListController);
router.get("/user-list-detail/:id", isAuth, isAdmin, userListDetail);
router.patch("/user-list-update/:id", isAuth, isAdmin, userListUpdate);
router.delete("/user-list-delete/:id", isAuth, isAdmin, userDeleteController);
router.get('/top-sellers', topSellerCarouselController )

module.exports = router;
