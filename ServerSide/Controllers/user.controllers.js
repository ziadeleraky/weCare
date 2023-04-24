const userModel = require("../Models/users.model");
const hireRequestModel = require("../Models/hireRequest.model");
const reviewModel = require("../Models/review.model");
const bcrypt = require("bcrypt");

class User {
  static getAllUsers = async (req, res) => {
    try {
      console.log(userModel);
      const users = await userModel.find({});
      res.status(200).json({
        status: "success",
        results: users.length,
        requestedAt: req.requestTime,
        data: {
          users,
        },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  static addNewUser = async (req, res) => {
    try {
      const user = await userModel.create(req.body);
      const userToken = await user.createToken();
      res.cookie("jwt", userToken, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
      const { password, ...other } = user._doc;
      res.status(200).json({
        status: "success",
        results: 1,
        requestedAt: req.requestTime,
        data: {
          ...other,
        },
        cookie: userToken,

      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  static getUserById = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user with this ID!");
      }
      const { password, ...other } = user._doc;

      res.status(200).json({
        status: "success",
        results: 1,
        requestedAt: req.requestTime,
        data: {
          ...other,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  static updateUserById = async (req, res, next) => {
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        throw new Error("There is no user with this ID!");
      }
      const { password, ...other } = user._doc;

      res.status(200).json({
        status: "success",
        results: 1,
        requestedAt: req.requestTime,
        data: {
          ...other,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  static deleteUserById = async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      if (!user) {
        throw new Error("There is no user with this ID!");
      }
      // res.cookie("jwt", "", { maxAge: 1 })
      res.status(201).json({
        status: "success",
      });
    } catch (err) {
      res.status(401).json({
        status: "fail",
        message: err.message,
      });
    }
  };
  static getAllRequests = async (req, res) => {
    try {
      console.log(hireRequestModel);
      const requests = await hireRequestModel.find({});
      res.status(200).json({
        status: "success",
        results: requests.length,
        requestedAt: req.requestTime,
        data: {
          requests,
        },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  static getAllReviews = async (req, res) => {
    try {
      const reviews = await reviewModel.find({});
      res.status(200).json({
        status: "success",
        results: reviews.length,
        requestedAt: req.requestTime,
        data: {
          reviews,
        },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        throw new Error("Invalid email or password");
      }
      const userToken = await user.createToken();
      res.cookie("jwt", userToken, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        status: "success",
        message: "User Logged in successfully",
        cookie: userToken,
      });
    } catch (err) {
      res.status(401).send(err.message);
    }
  };
}

module.exports = User;
