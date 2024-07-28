const express = require("express");
const {
  loginController,
  registerController,fetchAllUsersController,authController,applyDoctorController,bookeAppointmnetController,
  bookingAvailabilityController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);
router.get("/getall", fetchAllUsersController);
router.post("/getUserData", authMiddleware, authController);
router.post("/applyDoctorController", authMiddleware, applyDoctorController);
//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);
module.exports = router;