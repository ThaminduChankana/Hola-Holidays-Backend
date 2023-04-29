const express = require("express");
const {addNewTransport, 
    getOneTransport, 
    getTransport, 
    deleteTransport, 
    updateTransport} = require('../controllers/transportController');
const router = express.Router();

//routes for bus details
router.route("/add/").post(addNewTransport);
router.route("/delete/:id").delete(deleteTransport);
router.route("/get/").get(getTransport);
router.route("/get/:id").get(getOneTransport);
router.route("/update/:id").put(updateTransport);

module.exports = router;