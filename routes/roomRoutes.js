const express = require("express");
const { getRooms, createRoom, getRoomById, updateRoom, deleteRoom } = require("../controllers/roomController");
const { getRooms } = require("../controllers/roomController");
const { protectAdmin } = require("../middleware/authAdminMiddleware");
const router = express.Router();

router.route("/room/create").post(protectAdmin, createRoom);
router.route("/get-rooms/:id").get(protectAdmin, getRooms);
router.route("/room/:id").get(protectAdmin, getRoomById).put(protectAdmin, updateRoom);
router.route("/room/delete/:id").delete(protectAdmin, deleteRoom);

router.route("/rooms/:id").get(getRooms);

module.exports = router;
