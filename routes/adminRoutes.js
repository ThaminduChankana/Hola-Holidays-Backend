const express = require("express");
const { registerAdmin, authAdmin, getAdminProfile, updateAdminProfile } = require("../controllers/adminController");
const {
	getCustomers,
	updateCustomerProfileById,
	deleteCustomerProfileById,
	getCustomerProfileById,
} = require("../controllers/customerController");
const { protectAdmin } = require("../middleware/authAdminMiddleware");
const router = express.Router();

//Routes for Admin Account Operations
router.route("/register").post(registerAdmin);
router.route("/login").post(authAdmin);
router.route("/view").get(protectAdmin, getAdminProfile);
router.route("/edit").put(protectAdmin, updateAdminProfile);

//Routes for Customer account operations admin end
router
	.route("/customer/profile/view/:_id")
	.get(protectAdmin, getCustomerProfileById)
	.delete(protectAdmin, deleteCustomerProfileById);
router.route("/customer/profile/edit/:_id").put(protectAdmin, updateCustomerProfileById);
router.route("/customers").get(protectAdmin, getCustomers);

module.exports = router;
