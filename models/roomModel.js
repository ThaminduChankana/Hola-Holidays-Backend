const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Admin",
	},
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Hotel",
	},
	roomType: {
		type: String,
		required: true,
	},
	availability: {
		type: Number,
		required: true,
	},
	beds: {
		type: String,
		required: true,
	},
	roomSize: {
		type: String,
		required: true,
	},
	roomFacilities: {
		type: String,
		required: true,
	},
	bathRoomFacilities: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	pic: {
		type: String,
		required: true,
	},
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
