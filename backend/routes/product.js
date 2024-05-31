const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getAdminProducts,
} = require("../controllers/productContoller");

const { isAuthenticatedUser, authoriseRoles } = require("../middlewares/auth");

router.route("/product").get(getProducts);

router.route("/admin/products").get(getAdminProducts);

router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authoriseRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authoriseRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
