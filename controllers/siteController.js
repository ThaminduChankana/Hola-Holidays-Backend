const Site = require("../models/siteModel");
const asyncHandler = require("express-async-handler");

const addSite = asyncHandler(async (req, res) => {
	const {
		siteName,
		country,
		province,
		siteLocation,
		postalCode,
		picURL,
		description,
		recommendations,
		specialEvents,
		specialInstructions,
		moreInfoURL,
	} = req.body;

	const siteExists = await Site.findOne({ siteName });
	if (siteExists) {
		res.status(400);
		throw new Error("Site Already Exists !");
	} else {
		if (
			(!siteName || !country || !province || !siteLocation || !postalCode,
			!picURL || !description || !recommendations || !specialEvents || !specialInstructions || !moreInfoURL)
		) {
			res.status(400);
			throw new Error("Please Fill all the fields");
		} else {
			const site = new Site({
				siteName,
				country,
				province,
				siteLocation,
				postalCode,
				picURL,
				description,
				recommendations,
				specialEvents,
				specialInstructions,
				moreInfoURL,
			});

			const addedSite = await site.save();

			res.status(201).json(addedSite);
		}
	}
});

const getSites = asyncHandler(async (req, res) => {
	const sites = await Site.find();
	res.json(sites);
});

const getSitesForEachLocation = asyncHandler(async (req, res) => {
	const province = req.params.id;
	const sites = await Site.find({ province: province });
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
	const {
		siteName,
		country,
		province,
		siteLocation,
		postalCode,
		picURL,
		description,
		recommendations,
		specialEvents,
		specialInstructions,
		moreInfoURL,
	} = req.body;

	const site = await Site.findById(req.params.id);

	if (site) {
		site.siteName = siteName;
		site.country = country;
		site.province = province;
		site.siteLocation = siteLocation;
		site.postalCode = postalCode;
		site.picURL = picURL;
		site.description = description;
		site.recommendations = recommendations;
		site.specialEvents = specialEvents;
		site.specialInstructions = specialInstructions;
		site.moreInfoURL = moreInfoURL;

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
		await site.deleteOne();
		res.json({ message: "Site  Removed" });
	} else {
		res.status(404);
		throw new Error("Site  not Found");
	}
});

module.exports = {
	addSite,
	getSites,
	getSitesForEachLocation,
	getSiteById,
	updateSite,
	deleteSite,
};
