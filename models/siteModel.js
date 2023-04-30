const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const siteSchema = mongoose.Schema({
	siteName: {
		type: String,
		required: true,
		unique: true,
	},
	country: {
		type: String,
		required: true,
	},
	province: {
		type: String,
		required: true,
	},
	siteLocation: {
		type: String,
		required: true,
	},
	postalCode: {
		type: Number,
		required: true,
	},
	picURL: {
		type: String,
		default:
			"https://res.cloudinary.com/dfmnpw0yp/image/upload/v1682779898/Hola%20Holidays/assets/zsa4281sbunh7hq1kuys.jpg",
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
