const express = require("express");
const {
	registerCustomer,
	authCustomer,
	getCustomerProfile,
	updateCustomerProfile,
	deleteCustomerProfile,
} = require("../controllers/customerController");
const { protect } = require("../middleware/authCustomerMiddleware");
const router = express.Router();

//Routes for Customer Account Operations
router.route("/register").post(registerCustomer);
router.route("/login").post(authCustomer);
router.route("/view").get(protect, getCustomerProfile);
router.route("/edit").put(protect, updateCustomerProfile);
router.route("/delete").delete(protect, deleteCustomerProfile);

module.exports = router;
