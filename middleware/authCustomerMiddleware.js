const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel.js");
const asyncHandler = require("express-async-handler");

const protectCustomer = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.customer = await Customer.findById(decoded.id).select("-password");

			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not Authorized, Token Failed !");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not Authorized, No Token !");
	}
});

module.exports = { protectCustomer };
