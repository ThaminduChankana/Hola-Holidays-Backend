const express = require("express");
const { registerAdmin, authAdmin, getAdminProfile, updateAdminProfile } = require("../controllers/adminController");
const {
	getVendorProfileById,
	deleteVendorProfileById,
	updateVendorProfileById,
	getVendors,
} = require("../controllers/vendorController");
const {
	getCustomers,
	updateCustomerProfileById,
	deleteCustomerProfileById,
	getCustomerProfileById,
} = require("../controllers/customerController");
const { protect } = require("../middleware/authAdminMiddleware");
const router = express.Router();

//Routes for Admin Account Operations
router.route("/register").post(registerAdmin);
router.route("/login").post(authAdmin);
router.route("/view").get(protect, getAdminProfile);
router.route("/edit").put(protect, updateAdminProfile);

//Routes for Vendor account operations admin end
router.route("/vendor/profile/view/:_id").get(protect, getVendorProfileById).delete(protect, deleteVendorProfileById);
router.route("/vendor/profile/edit/:_id").put(protect, updateVendorProfileById);
router.route("/vendors").get(protect, getVendors);

//Routes for Customer account operations admin end
router
	.route("/customer/profile/view/:_id")
	.get(protect, getCustomerProfileById)
	.delete(protect, deleteCustomerProfileById);
router.route("/customer/profile/edit/:_id").put(protect, updateCustomerProfileById);
router.route("/customers").get(protect, getCustomers);

module.exports = router;
