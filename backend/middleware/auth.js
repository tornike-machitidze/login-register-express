import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    //1. get token from Client
    const token = req.header("Authorization").replace("Bearer ", "");
    //2. verify or check if it is made from our secret word
    // and so decoded has _id property
    // we made token from user _id
    const decoded = jwt.verify(token, "secrettokenword");

    //3. looking for user with this id
    // and in his tokens aray should be token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not Auth" });
  }
};

export default auth;
