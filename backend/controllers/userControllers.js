import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const createdUser = await new User(req.body);
    const newUser = await createdUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users, user: req.user });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.name,
      token,
    });
  } catch (error) {
    res.status(400).send();
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};
