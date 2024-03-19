const asyncHandler = require("express-async-handler");
const { User, validateUser } = require("../models/User");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const user = await User.findByIdAndUpdate(
    id,
    {
      username: req.body.username,
      isAdmin: req.body.isAdmin,
      email: req.body.email,
      password: req.body.password,
      createdAt: req.body.createdAt,
      profileImg: req.body.profileImg,
    },
    { new: true }
  );
  res.json(user).status(200);
});

module.exports = { getAllUsers, getUserById, updateUserById};
