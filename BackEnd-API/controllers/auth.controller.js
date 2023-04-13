import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    // find the user and checking it
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        message: "email is used, choose another one.",
      });
    }

    // password encryption
    const hash = bcrypt.hashSync(req.body.password, 5);

    // create a new user
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      message: "User has been created.",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // find the user
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    console.log({ user });
    // check the user
    if (!user) return next(createError(404, "User not found!"));

    // comparing the password
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(403).json({
        message: "Wrong password or username!",
      });

    console.log({ user });

    // create the token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );
    const { _id, firstName, lastName, email, idNumber } = user;
    const userToSend = {
      _id,
      firstName,
      lastName,
      email,
      idNumber,
      token,
    };
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(userToSend);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
export const users = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};
