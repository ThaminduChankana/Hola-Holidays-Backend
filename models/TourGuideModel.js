const mongoose = require("mongoose");

const TourGuideSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	language: {
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
	fee: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
});

const TourGuide = mongoose.model("TourGuide", TourGuideSchema);

module.exports = TourGuide;
