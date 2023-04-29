const mongoose = require("mongoose");
const moment = require("moment");

const busSchema = new mongoose.Schema(
	{
		licensePlate: {
			type: String,
			required: true,
		},
		startingStation: {
			type: String,
			required: true,
		},
		destinationStation: {
			type: String,
			required: true,
		},
		totalTravelTime: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
				},
				message: (props) => `${props.value} is not a valid time string in the format HH:mm!`,
			},
		},
		totalNumberOfSeats: {
			type: Number,
			required: true,
		},
		ticketPrice: {
			type: Number,
			required: true,
		},
		facilities: {
			type: [String],
		},
		cityStops: {
			type: [String],
			required: true,
		},
		mobileNo: {
			type: String,
			required: true,
		},
		leavingTime: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

busSchema.pre("validate", function (next) {
	const { totalTravelTime } = this;
	if (typeof totalTravelTime === "number") {
		this.totalTravelTime = moment.duration(totalTravelTime, "minutes").format("HH:mm");
	}
	next();
});

module.exports = new mongoose.model("Bus", busSchema);
