const express = require("express");
const {
	gethotels,
	addHotel,
	updateHotel,
	getHotelById,
	deleteHotel,
	gethotelsByCustomer,
} = require("../controllers/hotelController");
const { protectAdmin } = require("../middleware/authAdminMiddleware");
const router = express.Router();

router.route("/hotel/create").post(protectAdmin, addHotel);
router.route("/get-hotels/:id").get(protectAdmin, gethotels);
router.route("/hotel/:id").get(protectAdmin, getHotelById).put(protectAdmin, updateHotel);
router.route("/hotel/delete/:_id").delete(protectAdmin, deleteHotel);

router.route("/hotels").get(gethotelsByCustomer);
router.route("/hotels/:id").get(getHotelById);

module.exports = router;
