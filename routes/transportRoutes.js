const express = require("express");
const {
	addNewTransport,
	getOneTransport,
	getTransport,
	deleteTransport,
	updateTransport,
} = require("../controllers/transportController");
const { protectAdmin } = require("../middleware/authAdminMiddleware");
const router = express.Router();

//routes for bus details - customer
router.route("/").get(getTransport);
router.route("/get/:id").get(getOneTransport);

//routes for bus details - admin
router.route("/admin/add").post(protectAdmin, addNewTransport);
router.route("/admin/get").get(protectAdmin, getTransport);
router
	.route("/admin/get/:id")
	.get(protectAdmin, getOneTransport)
	.put(protectAdmin, updateTransport)
	.delete(protectAdmin, deleteTransport);

module.exports = router;
