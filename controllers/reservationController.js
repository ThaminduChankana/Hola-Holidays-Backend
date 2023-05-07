const Reservation = require("../models/reservationModel");
const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");

const getReservations = asyncHandler(async (req, res) => {
	const items = await Reservation.find({ customer: req.params.id });
	res.json(items);
});

const getReservationsForEachHotel = asyncHandler(async (req, res) => {
	const items = await Reservation.find({ hotel: req.params.id });
	res.json(items);
});

const getTotal = asyncHandler(async (req, res) => {
	var loopData = {};
	var loopData = new Object();
	const items = await Reservation.find({ customer: req.params.id });
	var total = 0;
	var i = 0;
	while (i < items.length) {
		total = total + items[i].price * items[i].noOfDates * items[i].noOfRooms;
		i++;
	}
	var loopData = {
		totalPrice: total,
	};
	res.json(loopData);
});

const addReservation = asyncHandler(async (req, res) => {
	const { customer, customerName, customerEmail, room, checkInDate, checkOutDate, noOfDates, noOfRooms } = req.body;

	if (
		!customer ||
		!customerName ||
		!customerEmail ||
		!room ||
		!checkInDate ||
		!checkOutDate ||
		!noOfDates ||
		!noOfRooms
	) {
		res.status(400);
		throw new Error("Failed adding reservation");
	} else {
		const item = await Reservation.findOne({
			customer: customer,
			room: room,
		});

		if (item) {
			throw new Error("Already has a reservation");
		} else {
			const hotelRoom = await Room.findOne({
				_id: room,
			});

			if (hotelRoom) {
				hotelRoom.availability = hotelRoom.availability - 1;
				const updatedRoom = await hotelRoom.save();
			}

			const roomItem = await Room.findById(room);
			const roomName = roomItem.roomType;
			const hotel = roomItem.hotel;
			const hotelItem = await Hotel.findOne({ _id: hotel.toString() });
			const hotelName = hotelItem.hotelName;
			const price = roomItem.price;
			const reservation = new Reservation({
				customer,
				customerName,
				customerEmail,
				hotel,
				hotelName,
				room,
				roomName,
				checkInDate,
				checkOutDate,
				noOfDates,
				noOfRooms,
				price,
			});

			const createdReservation = await reservation.save();

			res.status(201).json(createdReservation);
		}
	}
});

const updateReservation = asyncHandler(async (req, res) => {
	const { noOfRooms } = req.body;

	console.log(noOfRooms);

	const reservation = await Reservation.findById(req.params.id);

	const room = await Room.findOne({ _id: reservation.room.toString() });
	var previousQuantity = reservation.noOfRooms;

	if (room.availability <= 0) {
		if (previousQuantity > noOfRooms) {
			room.availability = room.availability + 1;
			const updatedRoom = await room.save();

			if (reservation) {
				reservation.noOfRooms = noOfRooms;

				const updatedReservation = await reservation.save();
				res.json(updatedReservation);
			} else {
				res.status(404);
				throw new Error("Reservation not found");
			}
		} else if (previousQuantity < quantity) {
			throw new Error("All Booked");
		}
	} else {
		if (previousQuantity > noOfRooms) {
			room.availability = room.availability + 1;
			const updatedRoom = await room.save();
		} else if (previousQuantity < noOfRooms) {
			room.availability = room.availability - 1;
			const updatedRoom = await room.save();
		}

		if (reservation) {
			reservation.noOfRooms = noOfRooms;

			const updatedReservation = await reservation.save();
			res.json(updatedReservation);
		} else {
			res.status(404);
			throw new Error("Reservation not found");
		}
	}
});

const deleteReservation = asyncHandler(async (req, res) => {
	const reservation = await Reservation.findById(req.params.id);

	const room = await Room.findOne({ _id: reservation.room });
	const availability = reservation.noOfRooms;

	if (reservation) {
		await reservation.deleteOne();
		room.availability = room.availability + availability;
		await room.save();
		res.json({ message: "Reservation Removed" });
	} else {
		res.status(404);
		throw new Error("Reservation not Found");
	}
});

module.exports = {
	getReservations,
	addReservation,
	updateReservation,
	deleteReservation,
	getTotal,
	getReservationsForEachHotel,
};
