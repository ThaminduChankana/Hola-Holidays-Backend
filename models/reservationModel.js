const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Customer",
	},
	customerName: {
		type: String,
		required: true,
	},
	customerEmail: {
		type: String,
		required: true,
	},
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Hotel",
	},
	hotelName: {
		type: String,
		required: true,
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Room",
	},
	roomName: {
		type: String,
		required: true,
	},
	checkInDate: {
		type: String,
		required: true,
	},
	checkOutDate: {
		type: String,
		required: true,
	},
	noOfDates: {
		type: Number,
		required: true,
	},
	noOfRooms: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
