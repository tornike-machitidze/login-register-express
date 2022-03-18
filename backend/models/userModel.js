import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// before "save" user we need to do bcrypt hashing and after that we call next
userSchema.pre("save", async function (next) {
  const user = this;
  // user is not created or property "password" is not changed, we can continue to save else hash it
  // თუ უზერი არც შექმნილა და არც პაროლი არ შეუცვლია შეგიძლია გააგრძელო სხვა ყველა შემთხვევაში პაროლი დაჰეშე
  if (!user.isModified("password")) {
    next();
  }

  user.password = await bcrypt.hash(user.password, 10);
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secrettokenword");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
