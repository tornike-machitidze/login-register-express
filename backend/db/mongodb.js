import mongoose from "mongoose";

const mongodb = async () => {
  try {
    const connected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/login-data"
    );
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default mongodb;
