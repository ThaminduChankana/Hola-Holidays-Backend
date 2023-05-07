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

//routes for bus details
router.route("/add/").post(protectAdmin, addNewTransport);
router.route("/delete/:id").delete(protectAdmin, deleteTransport);
router.route("/get/").get(getTransport);
router.route("/get/:id").get(getOneTransport);
router.route("/update/:id").put(protectAdmin, updateTransport);

module.exports = router;
