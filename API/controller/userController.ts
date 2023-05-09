import { NextFunction, Response, Request } from "express";
import User, { UserInterface } from "../model/userModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, gender, userName, password, email, role } =
      req.body;

    const findUser = await User.findOne({ email });

    if (findUser) return res.send(`Email exists in the system`);

    if (role === "admin") {
      const admin = "ADMIN";

      const user = await User.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        gender: gender.toLowerCase(),
        userName,
        password,
        email: email.toLowerCase(),
        role: admin,
      });
    } else {
      const user = await User.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        gender: gender.toLowerCase(),
        userName,
        password,
        email: email.toLowerCase(),
        role,
      });
    }

    // if (!secret) throw new Error("Missing jwt secret");

    // const token = jwt.encode({ userId: user._id, role: "public" }, secret);

    // res.cookie("user", token, {
    //   maxAge: 24 * 60 * 60 * 1000, //24 hours
    //   httpOnly: true,
    // });

    res.redirect("/profile");
    // res.json({ user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    res.json({ user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;

    //User Authentication....

    const findUser = await User.findOne({ userName, password });

    if (!findUser) throw new Error("User not found on get user function");

    if (!secret) throw new Error("Missing jwt secret");

    const token = jwt.encode({ userId: findUser._id, role: "public" }, secret);

    res.cookie("user", token, {
      maxAge: 60 * 60 * 1000, //1 hours
      httpOnly: true,
    });
    res.redirect("/main");
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const passwordRecovery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, userName, email } = req.body;
    const user = await User.findOne({
      firstName,
      lastName,
      userName,
      email,
    });

    if (!user) throw new Error("User not found, check entered data");

    res.status(200).send({ user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    const findUser = await User.findByIdAndDelete(userId);

    if (!findUser) throw new Error("User not found in delete user route.");

    const users = await User.find({});

    res.status(200).send({ findUser, users });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, firstName, lastName, gender, userName, password, email } =
      req.body;

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName,
        lastName,
        gender,
        userName,
        password,
        email,
      }
    );

    const user = await User.findById(userId);

    res.status(201).json({ user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
