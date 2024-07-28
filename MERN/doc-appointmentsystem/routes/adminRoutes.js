const express = require("express");
const {
  getAllUsersController,getDoctorByIdController,
  getAllDoctorsController,changeAccountStatusController,getDoctorsByUserIdController,getUseridController,DoctorProfileupdate
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
router.post("/getDoctorsByUserIdController",authMiddleware, getDoctorsByUserIdController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

router.get(
    "/getUseridController",
    authMiddleware,
    getUseridController
  );
  router.post(
    "/DoctorProfileupdate",
    authMiddleware,
    DoctorProfileupdate
  );
  router.post(
    "/getDoctorByIdController",
    authMiddleware,
    getDoctorByIdController
  );
module.exports = router