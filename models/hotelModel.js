const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Admin",
	},
	hotelName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	facilities: {
		type: String,
		required: true,
	},
	rules: {
		type: String,
		required: true,
	},
	pic: {
		type: String,
		required: true,
	},
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
