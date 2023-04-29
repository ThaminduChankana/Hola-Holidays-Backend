const Site = require("../models/siteModel");
const asyncHandler = require("express-async-handler");

const addSite = asyncHandler(async (req, res) => {
	const { siteName, siteLocation, country, picURL, description, recommendations, specialEvents, specialInstructions } =
		req.body;

	if (
		!siteName ||
		!siteLocation ||
		!country ||
		!picURL ||
		!description ||
		!recommendations ||
		!specialEvents ||
		!specialInstructions
	) {
		res.status(400);
		throw new Error("Please Fill all the fields");
	} else {
		const site = new Site({
			siteName,
			siteLocation,
			country,
			picURL,
			description,
			recommendations,
			specialEvents,
			specialInstructions,
		});

		const addedSite = await site.save();

		res.status(201).json(addedSite);
	}
});

const getSites = asyncHandler(async (req, res) => {
	const sites = await Site.find();
	res.json(sites);
});

const getSiteForEachLocation = asyncHandler(async (req, res) => {
	const { siteLocation } = req.body;

	const sites = await Site.find(siteLocation);
	res.status(201).json(sites);
});

const getSiteById = asyncHandler(async (req, res) => {
	const site = await Site.findById(req.params.id);

	if (site) {
		res.json(site);
	} else {
		res.status(404).json({ message: "Site not found" });
	}
});

const updateSite = asyncHandler(async (req, res) => {
	const { siteName, siteLocation, country, picURL, description, recommendations, specialEvents, specialInstructions } =
		req.body;

	const site = await Site.findById(req.params.id);

	if (site) {
		site.siteName = siteName;
		site.siteLocation = siteLocation;
		site.country = country;
		site.picURL = picURL;
		site.description = description;
		site.recommendations = recommendations;
		site.specialEvents = specialEvents;
		site.specialInstructions = specialInstructions;

		const updatedSite = await site.save();
		res.json(updatedSite);
	} else {
		res.status(404);
		throw new Error("Site not found");
	}
});

const deleteSite = asyncHandler(async (req, res) => {
	const site = await Site.findById(req.params.id);

	if (site) {
		await site.remove();
		res.json({ message: "Site  Removed" });
	} else {
		res.status(404);
		throw new Error("Site  not Found");
	}
});

module.exports = {
	addSite,
	getSites,
	getSiteForEachLocation,
	getSiteById,
	updateSite,
	deleteSite,
};
