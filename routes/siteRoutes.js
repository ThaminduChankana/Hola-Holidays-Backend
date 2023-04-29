const express = require("express");

const { protectAdmin } = require("../middleware/authAdminMiddleware");
const {
	addSite,
	getSites,
	getSitesForEachLocation,
	getSiteById,
	updateSite,
	deleteSite,
} = require("../controllers/siteController");
const router = express.Router();

//get site routes
router.route("/").get(getSites);
router.route("/location/:id").get(getSitesForEachLocation);
router.route("/get/:id").get(getSiteById);

//admin's site routes
router.route("/admin/add").post(protectAdmin, addSite);
router.route("/admin/get").get(protectAdmin, getSites);
router
	.route("/admin/get/:id")
	.get(protectAdmin, getSiteById)
	.put(protectAdmin, updateSite)
	.delete(protectAdmin, deleteSite);

module.exports = router;
