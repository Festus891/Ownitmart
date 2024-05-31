const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const { isAuthenticatedUser, authoriseRoles } = require("../middlewares/auth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authoriseRoles("admin"), allUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authoriseRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authoriseRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteUser);

module.exports = router;
