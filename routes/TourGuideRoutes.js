const express = require("express");
const { protectAdmin } = require("../middleware/authAdminMiddleware");


const { addGuide,
        getGuides,
        getGuidesById,
        updateGuide,
        deleteGuide } = require("../controllers/TourGuideController");
        
const router = express.Router();


// customer routes
router.route("/customer/get").get(getGuides);
router.route("/get/:id").get(getGuidesById);

//admin's site routes
router.route("/admin/add").post(protectAdmin,addGuide);
router.route("/admin/get").get(protectAdmin,getGuides);
router
	.route("/admin/get/:id")
	.get(protectAdmin, getGuidesById)
	.put( protectAdmin,updateGuide)
	.delete(protectAdmin, deleteGuide);



module.exports = router;

