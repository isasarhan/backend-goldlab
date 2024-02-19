const asyncHandler = require("express-async-handler");

const authorize = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin) res.status(400).send("Access denied!");
  next();
});

module.exports = { authorize };
