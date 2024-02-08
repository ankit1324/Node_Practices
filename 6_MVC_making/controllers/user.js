const User = require("../models/User");

const handleGetAllUsers = async (req, res) => {
  const allDbUser = await User.find({});
  return res.json(allDbUser);
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
};

const handleUpdateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ status: "Success" });
};

const handleDeleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(202).json({ msg: "Deleted" });
};

const handelCreateNewUser = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "Success", id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handelCreateNewUser,
};
