const asyncHandler = require("express-async-handler");
const { User, validateUser } = require("../models/User");
const jwt = require("jsonwebtoken");
const { isUserExist } = require("./userController");

const userRegister = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.json({ error: error.details[0].message }).status(400);
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) 
  throw new Error("user already exist!");
  // return res.status(403).json({error:"user already exist"})

  const user = new User({
    username: req.body.username,
    isAdmin: req.body.isAdmin,
    email: req.body.email,
    password: req.body.password,
    profileImg: req.file ? req.file.filename : " ",
  });

  const result = await user.save();

  if (!result) return res.send("error registering user!").status(400);
  res.json(result).status(200);
});

const userLogin = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(404);
    throw new Error("Invalid Email or Password!");
  }
  res
    .json({
      id: user._id,
      profileImg: user.profileImg,
      username: user.username,
      isAdmin: user.isAdmin,
      email: email,
      token: generateToken(user._id),
    })
    .status(200);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
module.exports = { userRegister, userLogin };
