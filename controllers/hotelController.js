const Hotel = require("../models/hotelModel");
const asyncHandler = require("express-async-handler");

const gethotels = asyncHandler(async (req, res) => {
	const items = await Hotel.find({ admin: req.params.id });
	res.json(items);
});

const gethotelsByCustomer = asyncHandler(async (req, res) => {
	const items = await Hotel.find();
	res.status(200).json(items);
});

const addHotel = asyncHandler(async (req, res) => {
	const { admin, hotelName, address, location, description, facilities, rules, pic } = req.body;

	if (!admin || !hotelName || !address || !location || !description || !facilities || !rules || !pic) {
		res.status(400);
		throw new Error("Failed adding hotel");
	} else {
		const hotel = new Hotel({
			admin,
			hotelName,
			address,
			location,
			description,
			facilities,
			rules,
			pic,
		});

		const createdHotel = await hotel.save();

		res.status(201).json(createdHotel);
	}
});
const updateHotel = asyncHandler(async (req, res) => {
	const { hotelName, address, location, description, facilities, rules, pic } = req.body;

	const hotel = await Hotel.findById(req.params.id);

	if (hotel) {
		hotel.hotelName = hotelName;
		hotel.address = address;
		hotel.location = location;
		hotel.description = description;
		hotel.facilities = facilities;
		hotel.rules = rules;
		hotel.pic = pic;

		const updatedHotel = await hotel.save();
		res.json(updatedHotel);
	} else {
		res.status(404);
		throw new Error("Hotel not found");
	}
});

const getHotelById = asyncHandler(async (req, res) => {
	const hotel = await Hotel.findById(req.params.id);

	if (hotel) {
		res.status(200).json(hotel);
	} else {
		res.status(404).json({ message: "Hotel not found" });
	}
});

const deleteHotel = asyncHandler(async (req, res) => {
	const hotel = await Hotel.findById(req.params._id);
	if (hotel) {
		await hotel.deleteOne();
		res.json({ message: "Item Removed" });
	} else {
		res.status(404);
		throw new Error("Item not Found");
	}
});
module.exports = {
	gethotels,
	addHotel,
	updateHotel,
	getHotelById,
	deleteHotel,
	gethotelsByCustomer,
};
