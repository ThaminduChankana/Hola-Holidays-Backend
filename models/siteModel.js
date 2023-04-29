const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const siteSchema = mongoose.Schema({
	siteName: {
		type: String,
		required: true,
	},
	siteLocation: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	picURL: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	recommendations: {
		type: String,
		required: true,
	},
	specialEvents: {
		type: String,
		required: true,
	},
	specialInstructions: {
		type: String,
		required: true,
	},
});

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
