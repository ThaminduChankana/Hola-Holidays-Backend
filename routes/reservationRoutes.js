const express = require("express");
const { getReservationsForEachHotel } = require("../controllers/reservationController");
const { protectAdmin } = require("../middleware/authAdminMiddleware");
const router = express.Router();

router.route("/get-reservations/:id").get(protectAdmin, getReservationsForEachHotel);

module.exports = router;
