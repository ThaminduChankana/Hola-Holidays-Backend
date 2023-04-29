const express = require("express");

const { protect } = require("../middleware/authAdminMiddleware");
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
router.route("/admin/add").post(protect, addSite);
router.route("/admin/get").get(protect, getSites);
router.route("/admin/get/:id").get(protect, getSiteById).put(protect, updateSite).delete(protect, deleteSite);

module.exports = router;
