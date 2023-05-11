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
    const { firstName, lastName, gender, userName, password, email, adminToken } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) return res.send(`Email already exists in the system`);

      const user = await User.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        gender: gender.toLowerCase(),
        userName,
        password,
        email: email.toLowerCase(),
      });

      if (adminToken === "amit" && user.userRole === "simple") {
        user.userRole = "admin"
        user.save()
    }

      if (!secret) throw new Error("Missing jwt secret");

      const token = jwt.encode({ 
        userId: user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        gender:user.gender,
        userName:user.userName,
        email:user.email, 
        userRole: user.userRole,
        role: "public" }, secret);

      res.cookie("user", token, {
        maxAge: 24 * 60 * 60 * 1000, //24 hours
        httpOnly: true,
      });

      res.redirect("/signIn");
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
      const { user } = req.cookies;
      
      if (!secret) throw new Error("No secret")
      if (!user) throw new Error("No user found")

      const decoded = jwt.decode(user, secret)

      const cookieUser = decoded

      res.send({ ok: true, cookieUser })

    } catch (error: any) {
      console.error(error);
      res.status(500).send({ error: "error.message" });
    }
  };



  export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userName, password } = req.body;
      console.log("entered userlogin")
      //User Authentication....

      const user = await User.findOne({ userName, password });
      if (!user) throw new Error("User not found on get user function");

      if (!secret) throw new Error("Missing jwt secret");

      const token = jwt.encode({ 
        userId: user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        gender:user.gender,
        userName:user.userName,
        email:user.email, 
        userRole: user.userRole,
        role: "public" }, secret);

      res.cookie("user", token, {
        maxAge: 60 * 60 * 1000, //1 hours
        httpOnly: true,
      });

      res.redirect("/profile");
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
