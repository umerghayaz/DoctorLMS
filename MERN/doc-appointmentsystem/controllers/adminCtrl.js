const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const { ObjectId } = require('mongodb');

const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "users data list",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "erorr while fetching users",
        error,
      });
    }
  };
  const getAllDoctorsController = async (req, res) => {
    try {
      const doctors = await doctorModel.find({});
      res.status(200).send({
        success: true,
        message: "Doctors Data list",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while getting doctors data",
        error,
      });
    }
  };
  const getUseridController = async (req, res) => {
    // const userId = req.params.userId; // Assuming the user ID is part of the request parameters
//   console.log(userId)
    const { id,email } = req.body;

    try {
      // Use the find method with a query for the user ID
    //   const doctors = await doctorModel.find({ userId: userId });
    
      const users = await userModel.find({_id: id});

      res.status(200).send({
        success: true,
        message: `user data list for User ID: ${id}`,
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting doctors data",
        error: error,
      });
    }
  };
  const getDoctorsByUserIdController = async (req, res) => {
    // const userId = req.params.doctorId; // Assuming the user ID is part of the request parameters
    // const { doctorId, status } = req.body;
    const { id } = req.body;

    try {
      // Use the find method with a query for the user ID
    //   const doctors = await doctorModel.find({ userId: userId });
      const doctors = await doctorModel.findOne({doctorprofileId: req.body.id  });

      res.status(200).send({
        success: true,
        // message: `Doctors Data list for User ID: ${userId}`,
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting doctors data",
        error: error,
      });
    }
  };
  const getDoctorByIdController = async (req, res) => {
    // const userId = req.params.doctorId; // Assuming the user ID is part of the request parameters
    const { id } = req.body;

    try {
      // Use the find method with a query for the user ID
    //   const doctors = await doctorModel.find({ userId: userId });
      // const doctors = await doctorModel.findOne({_id: id  });
      // const users = await doctorModel.find({_id: id});
      const users = await doctorModel.find({ _id: new  ObjectId(id.trim()) });

      res.status(200).send({
        success: true,
        message: `Doctors Data list for User ID: ${id}`,
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting doctors data",
        error: error,
      });
    }
  };
  const DoctorProfileupdate = async (req, res) => {
    // const userId1 = req.params.userId; // Assuming the user ID is part of the request parameters
    const id= req.body.id;
    const body= req.body;

    try {
      // Use the find method with a query for the user ID
    //   const doctors = await doctorModel.find({ userId: userId });
      const doctors = await doctorModel.findByIdAndUpdate( id,body, { new: true });

      res.status(200).send({
        success: true,
        message: 'doctor profile updated',
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting doctors data",
        error: error,
      });
    }
  };
  // doctor account status
  const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status,bhai } = req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id: bhai });

    //   const user = await userModel.findOne({ userId: doctor._id });
    //   const user = await userModel.find({_id: doctorId});

      const notifcation = user.notifcation;
      notifcation.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor ,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'false' ,
        // user: user ,
      });
    }
  };
  
  module.exports = {
    getAllDoctorsController,
    getAllUsersController,getDoctorByIdController,
    changeAccountStatusController,getDoctorsByUserIdController,getUseridController,DoctorProfileupdate
  };