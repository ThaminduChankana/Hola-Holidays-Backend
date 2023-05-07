const express = require("express");
const {
	getReservationsForEachHotel,
	getReservations,
	addReservation,
	updateReservation,
	deleteReservation,
	getTotal,
} = require("../controllers/reservationController");
const { protectAdmin } = require("../middleware/authAdminMiddleware");
const { protectCustomer } = require("../middleware/authCustomerMiddleware");
const router = express.Router();

router.route("/get-reservations/:id").get(protectAdmin, getReservationsForEachHotel);

router.route("/reservation/create").post(protectCustomer, addReservation);
router.route("/reservation/get/:id").get(protectCustomer, getReservations);
router.route("/reservation/get/total/:id").get(protectCustomer, getTotal);
router.route("/reservation/update/:id").put(protectCustomer, updateReservation);
router.route("/reservation/delete/:id").delete(protectCustomer, deleteReservation);

module.exports = router;
