const asyncHandler = require("express-async-handler");
const busSchema = require('../models/transportModel');

//add new bus entry
const addNewTransport = asyncHandler(async (req,res) => {
    //get bus details
    const {licensePlate,startingStation,destinationStation,totalTravelTime,totalNumberOfSeats,ticketPrice,facilities,cityStops,mobileNo,leavingTime} = req.body;

    //create new bus entry
    const newTransport = new busSchema({
        licensePlate:licensePlate,
        startingStation:startingStation,
        destinationStation:destinationStation,
        totalTravelTime:totalTravelTime,
        totalNumberOfSeats:totalNumberOfSeats,
        ticketPrice:ticketPrice,
        facilities:facilities,
        cityStops:cityStops,
        mobileNo:mobileNo,
		leavingTime:leavingTime
    });

     //save new bus entry
     await newTransport.save();

     if(newTransport){
        res.status(201).json({
			_id: newTransport._id,
			licensePlate: newTransport.licensePlate,
            startingStation: newTransport.startingStation,
            destinationStation: newTransport.destinationStation,
            totalTravelTime: newTransport.totalTravelTime,
            totalNumberOfSeats: newTransport.totalNumberOfSeats,
            ticketPrice: newTransport.ticketPrice,
            facilities: newTransport.facilities,
            cityStops: newTransport.cityStops,
            mobileNo: newTransport.mobileNo,
            leavingTime: newTransport.leavingTime,
		});
     } else {
        res.status(400);
		throw new Error("Failed to add a new bus entry!");
     }
})

//get all bus entries
const getTransport = asyncHandler(async (req, res) => {
	const bus = await busSchema.find();
	res.json(bus);
});

//get a bus entry by id
const getOneTransport = asyncHandler(async (req, res) => {

    //get bus id
    const bus_id = req.params.id;

	const bus = await busSchema.findById(bus_id);

	if (bus) {
		res.json(bus);
	} else {
		res.status(400);
		throw new Error("Bus entry not found!");
	}
});

//delete a bus entry
const deleteTransport = asyncHandler(async (req, res) => {

    //get bus id
    const bus_id = req.params.id;

	const bus = await busSchema.findById(bus_id);

	if (bus) {
		await bus.deleteOne();
		res.json({ message: "Bus entry is deleted!" });
	} else {
		res.status(404);
		throw new Error("Bus entry not found!");
	}
});

//update a bus entry
const updateTransport = asyncHandler(async (req, res) => {
     //get bus id
     const bus_id = req.params.id;

     const bus = await busSchema.findById(bus_id);

    if(bus){
        bus.licensePlate = req.body.licensePlate || bus.licensePlate;
        bus.startingStation = req.body.startingStation || bus.startingStation;
        bus.destinationStation = req.body.destinationStation || bus.destinationStation;
        bus.totalTravelTime = req.body.totalTravelTime || bus.totalTravelTime;
        bus.totalNumberOfSeats = req.body.totalNumberOfSeats || bus.totalNumberOfSeats;
        bus.ticketPrice = req.body.ticketPrice || bus.ticketPrice;
        bus.facilities = req.body.facilities || bus.facilities;
        bus.cityStops = req.body.cityStops || bus.cityStops;
        bus.mobileNo = req.body.mobileNo || bus.mobileNo;
        bus.leavingTime = req.body.leavingTime || bus.leavingTime;

		const updatedBus = await bus.save();

		res.json({
			_id: updatedBus._id,
			licensePlate: updatedBus.licensePlate,
            startingStation: updatedBus.startingStation,
            destinationStation: updatedBus.destinationStation,
            totalTravelTime: updatedBus.totalTravelTime,
            totalNumberOfSeats: updatedBus.totalNumberOfSeats,
            ticketPrice: updatedBus.ticketPrice,
            facilities: updatedBus.facilities,
            cityStops: updatedBus.cityStops,
            mobileNo: updatedBus.mobileNo,
            leavingTime: updatedBus.leavingTime,
		});
        
    } else {
        res.status(404);
        throw new Error("Bus entry not found!");
    }

});

module.exports = {
    addNewTransport,
    getTransport,
    getOneTransport,
    deleteTransport,
    updateTransport
}