const { model, Schema } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  username: { type: String, unique: true, required: true, min: 5, max: 10 },
  password: { type: String, required: true, min: 10, max: 1024 },
  profileImg: { type: String },
  isAdmin: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
const User = model("User", UserSchema);
function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string().min(5).max(10),
    password: Joi.string().min(10).max(1024),
    profileImg: Joi.string(),
    isAdmin: Joi.boolean(),
    createdAt: Joi.date(),
  });
  return schema.validate(user);
}
module.exports = { User, validateUser };
