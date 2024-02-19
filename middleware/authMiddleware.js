const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authirized! Token failed.");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized! No Token");
  }
});

module.exports = { authenticate };
