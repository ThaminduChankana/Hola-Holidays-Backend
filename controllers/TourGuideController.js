const asyncHandler = require("express-async-handler");
const TourGuide = require("../models/TourGuideModel");

const addGuide = asyncHandler(async (req, res) => {
	const { name, gender, language, location, description, fee, phoneNumber } = req.body;

	if (!name || !gender || !language || !location || !description || !fee || !phoneNumber) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const tourGuide = new TourGuide({
			name,
			gender,
			language,
			location,
			description,
			fee,
			phoneNumber,
		});

		const addedGuide = await tourGuide.save();

		res.status(201).json(addedGuide);
		console.log(req.body);
	}
});

const getGuides = asyncHandler(async (req, res) => {
	const tourGuides = await TourGuide.find();
	res.json(tourGuides);
});

const getGuidesById = asyncHandler(async (req, res) => {
	const tourGuide = await TourGuide.findById(req.params.id);

	if (tourGuide) {
		res.json(tourGuide);
	} else {
		res.status(404).json({ message: "tour guide not found" });
	}
});

const updateGuide = asyncHandler(async (req, res) => {
	const { name, gender, language, location, description, fee, phoneNumber } = req.body;

	const guide = await TourGuide.findById(req.params.id);

	if (guide) {
		guide.name = name;
		guide.gender = gender;
		guide.language = language;
		guide.location = location;
		guide.description = description;
		guide.fee = fee;
		guide.phoneNumber = phoneNumber;

		const updatedGuide = await guide.save();
		res.json(updatedGuide);
	} else {
		res.status(404);
		throw new Error("guide not found");
	}
});

// delete a single guide
const deleteGuide = asyncHandler(async (req, res) => {
	const guide = await TourGuide.findById(req.params.id);

	if (guide) {
		await guide.deleteOne();
		res.json({ message: "Tour Guide  Removed" });
	} else {
		res.status(404);
		throw new Error("Tour guide not Found");
	}
});

module.exports = {
	addGuide,
	getGuides,
	getGuidesById,
	updateGuide,
	deleteGuide,
};
